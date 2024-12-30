import { Repository } from "./repository";
import { BackgroundInsert, OutboxMessageSelect } from "./db";
import { BackgroundUpdate } from "./types";
import { MeiliClient } from "./meili";
import { Developer, DeveloperProfileStatus } from "../developer-profiles";
import { TaskStatus } from "meilisearch";
import { backgroundsService } from "./instance";

const OK_STATUSES: TaskStatus[] = ["succeeded", "enqueued", "processing"];
export function createBackgroundsService(
  repository: Repository,
  meiliClient: MeiliClient,
  getDevStatusByDevId: (devId: string) => Promise<DeveloperProfileStatus>,
  getHighlightedDevIds: () => Promise<string[]>,
  getDeveloperById: (id: string) => Promise<Developer>,
  checkUserAccess: (id: string) => Promise<boolean>
) {
  repository.getAllOutboxMessage().then((outboxMessages) => {
    outboxMessages.forEach((outboxMessage) => {
      updateMeilisearchFor(outboxMessage);
    });
  });

  async function updateMeilisearchFor(outboxMessage: OutboxMessageSelect) {
    let succeeded = false;
    switch (outboxMessage.operation) {
      case "upsert":
        const background = await repository.getBackgroundByDevId(
          outboxMessage.devId
        );
        if (!background) {
          succeeded = true;
          break;
        }
        const skills = background.skills.map((s) => s.name);
        const languages = background.languages.map((l) => l.name);
        const educations = background.educations.map((e) => e.name);
        const upsertStatus = await meiliClient.upsertBackground({
          ...background,
          skills,
          languages,
          educations,
        });
        succeeded = OK_STATUSES.includes(upsertStatus);
        break;
      case "delete":
        const deleteStatus = await meiliClient.deleteBackground(
          outboxMessage.devId
        );
        succeeded = OK_STATUSES.includes(deleteStatus);
        break;
    }
    if (succeeded) {
      await repository.removeOutboxMessage(outboxMessage.id);
    }
  }

  return {
    async getAllBackgrounds() {
      return await repository.getAllBackgrounds();
    },
    async getBackgroundByDevId(devId: string) {
      return await repository.getBackgroundByDevId(devId);
    },
    async getAllSkills() {
      return (await repository.getAllSkills()).filter(
        (skill, index, array) =>
          array.findIndex((s) => s.name === skill.name) === index
      );
    },
    async getAllLanguages() {
      return (await repository.getAllLanguages()).filter(
        (language, index, array) =>
          array.findIndex((l) => l.name === language.name) === index
      );
    },
    async getAllEducations() {
      return (await repository.getAllEducations()).filter(
        (education, index, array) =>
          array.findIndex((e) => e.name === education.name) === index
      );
    },
    async add(background: BackgroundInsert) {
      const { outboxMessageId, backgroundId } =
        await repository.add(background);

      const status = await meiliClient.upsertBackground({
        id: backgroundId,
        ...background,
      });
      if (OK_STATUSES.includes(status)) {
        await repository.removeOutboxMessage(outboxMessageId);
      }
    },

    async update(background: BackgroundUpdate) {
      const { outboxMessageId } = await repository.update(background);

      const status = await meiliClient.upsertBackground(background);
      if (OK_STATUSES.includes(status)) {
        await repository.removeOutboxMessage(outboxMessageId);
      }
    },

    async getHighlightedDevIds() {
      return await getHighlightedDevIds();
    },

    async searchDevIds(search: string | undefined) {
      const cleanSearch = search?.trim();
      let allDevIds = [];
      if (!cleanSearch || cleanSearch === "") {
        allDevIds = (await this.getAllBackgrounds()).map(
          (background) => background.devId
        );
      } else {
        allDevIds = await meiliClient.searchDevIds(search);
      }
      const filteredDevIds = [];
      for (const devId of allDevIds) {
        const status = await getDevStatusByDevId(devId);
        if (status === "highlighted" || status === "published") {
          filteredDevIds.push(devId);
        }
      }
      return filteredDevIds;
    },
    async removeAllBackgroundsFromMeili() {
      await meiliClient.deleteAllBackgrounds();
    },
    async getAllPosts() {
      return await repository.getAllPosts();
    },
    async getPostById(developerId: string) {
      return await repository.getPostById(developerId);
    },
    async doesMeilisearchNeedUpdate() {
      return (await repository.getAllOutboxMessage()).length > 0;
    },
    async updateMeilisearch() {
      const outboxMessages = await repository.getAllOutboxMessage();
      for (const outboxMessage of outboxMessages) {
        updateMeilisearchFor(outboxMessage);
      }
    },
    async editAccess(id: string) {
      return checkUserAccess(id);
    },
    async addDeveloperBackground(id: string) {
      const developer = await getDeveloperById(id);
      await backgroundsService.add({
        name: developer.name,
        devId: developer.id,
        title: "developer2",
        bio: "test",
        links: [],
        skills: [],
        languages: [],
        educations: [],
      });
      return developer;
    },
  };
}
