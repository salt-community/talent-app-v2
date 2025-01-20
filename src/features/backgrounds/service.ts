import { Repository } from "./repository";
import { BackgroundInsert, OutboxMessageSelect } from "./db";
import { BackgroundUpdate } from "./types";
import { MeiliClient } from "./meili";
import { DeleteDeveloperProfile, Developer } from "../developer-profiles";
import { Settings, TaskStatus } from "meilisearch";
import { backgroundsService } from "./instance";
import { CreateDeveloperProfile, GetAllById } from "@/features";

const OK_STATUSES: TaskStatus[] = ["succeeded", "enqueued", "processing"];
export function createBackgroundsService(
  repository: Repository,
  meiliClient: MeiliClient,
  getPublishedOrHighlightedDevIds: () => Promise<string[]>,
  getHighlightedDevIds: () => Promise<string[]>,
  getDeveloperById: (id: string) => Promise<Developer>,
  checkUserAccess: (id: string) => Promise<boolean>,
  createDeveloperProfile: CreateDeveloperProfile,
  getAllById: GetAllById,
  deleteDeveloperProfile: DeleteDeveloperProfile
) {
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
      const time = performance.now();
      const [searchedDevIds, publishedOrHighlightedDevIds] = await Promise.all([
        !cleanSearch || cleanSearch === ""
          ? await repository.getAllDevIds()
          : await meiliClient.searchDevIds(search),
        await getPublishedOrHighlightedDevIds(),
      ]);

      const filteredDevIds = searchedDevIds.filter((devId) =>
        publishedOrHighlightedDevIds.includes(devId)
      );
      console.log("Search time:", performance.now() - time);
      return filteredDevIds;
    },
    async isSearchHealthOk() {
      return await meiliClient.isHealthOk();
    },
    async repopulateMeiliSearch() {
      await meiliClient.deleteAllBackgrounds();
      const backgrounds = await repository.getAllBackgrounds();
      for (const background of backgrounds) {
        const skills = background.skills.map((s) => s.name);
        const languages = background.languages.map((l) => l.name);
        const educations = background.educations.map((e) => e.name);
        await meiliClient.upsertBackground({
          ...background,
          skills,
          languages,
          educations,
        });
      }
    },

    async syncMeilisearch() {
      const outboxMessages = await repository.getAllOutboxMessage();
      for (const outboxMessage of outboxMessages) {
        updateMeilisearchFor(outboxMessage);
      }
    },
    async doesMeilisearchNeedSync() {
      return (await repository.getAllOutboxMessage()).length > 0;
    },
    async getMeilisearchSettings() {
      return await meiliClient.getSettings();
    },
    async updateMeilisearchSettings(settings: Settings) {
      await meiliClient.updateSettings(settings);
    },
    async resetMeilisearchSettings() {
      await meiliClient.resetSettings();
    },

    async getAllPosts() {
      return await repository.getAllPosts();
    },
    async getPostById(developerId: string) {
      return await repository.getPostById(developerId);
    },
    async editAccess(developerProfileId: string) {
      //identity id
      return checkUserAccess(developerProfileId);
    },
    async addDeveloperBackground(id: string) {
      const developer = await getDeveloperById(id);
      await backgroundsService.add({
        name: developer.name,
        devId: developer.id,
        title: "developer",
        bio: "",
        links: [],
        skills: [],
        languages: [],
        educations: [],
      });
      return developer;
    },
    async createDeveloperProfile(identityId: string) {
      await createDeveloperProfile(identityId);
    },
    async getAllDeveloperProfilesById(identityId: string) {
      return await getAllById(identityId);
    },
    async deleteDeveloperProfile(devId: string) {
      await deleteDeveloperProfile(devId);
    },
  };
}
