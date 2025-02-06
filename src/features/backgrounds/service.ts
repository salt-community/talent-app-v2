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
  getHighlightedDeveloperProfileIds: () => Promise<string[]>,
  getDeveloperById: (id: string) => Promise<Developer>,
  checkUserAccess: (id: string) => Promise<boolean>,
  createDeveloperProfile: CreateDeveloperProfile,
  getAllById: GetAllById,
  deleteDeveloperProfile: DeleteDeveloperProfile,
  getIdentityIdByDeveloperProfileId: (id: string) => Promise<string | null>
) {
  async function updateMeilisearchFor(outboxMessage: OutboxMessageSelect) {
    let succeeded = false;
    switch (outboxMessage.operation) {
      case "upsert":
        const background = await repository.getBackgroundByDeveloperProfileId(
          outboxMessage.devId
        );
        if (!background) {
          succeeded = true;
          break;
        }
        const skills = background
          .map((s) => s.background_skills?.name)
          .filter((name): name is string => !!name);
        const languages = background
          .map((l) => l.background_languages?.name)
          .filter((name): name is string => !!name);
        const educations = background
          .map((e) => e.background_educations?.name)
          .filter((name): name is string => !!name);

        const upsertStatus = await meiliClient.upsertBackground({
          id: background[0].backgrounds.id,
          devId: background[0].backgrounds.devId,
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
    async getBackgroundByDeveloperProfileId(developerProfileId: string) {
      return await repository.getBackgroundByDeveloperProfileId(
        developerProfileId
      );
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

    async getHighlightedDeveloperProfileIds() {
      return await getHighlightedDeveloperProfileIds();
    },

    async searchDeveloperProfileIds(search: string | undefined) {
      const cleanSearch = search?.trim();
      const [
        searchedDeveloperProfileIds,
        publishedOrHighlightedDeveloperProfileIds,
      ] = await Promise.all([
        !cleanSearch || cleanSearch === ""
          ? await repository.getAllDeveloperProfileIds()
          : await meiliClient.searchDevIds(search),
        await getPublishedOrHighlightedDevIds(),
      ]);

      const filteredDeveloperProfileIds = searchedDeveloperProfileIds.filter(
        (devId) => publishedOrHighlightedDeveloperProfileIds.includes(devId)
      );
      return filteredDeveloperProfileIds;
    },
    async isSearchHealthOk() {
      return await meiliClient.isHealthOk();
    },
    async repopulateMeiliSearch() {
      await meiliClient.deleteAllBackgrounds();
      const backgrounds = await repository.getAllBackgrounds();

      const skills = backgrounds.map((s) => s.background_skills?.name);
      const languages = backgrounds.map((l) => l.background_languages?.name);
      const educations = backgrounds.map((e) => e.background_educations?.name);

      await meiliClient.upsertBackground({
        id: backgrounds[0].backgrounds?.id,
        devId: backgrounds[0].backgrounds?.devId,
        skills,
        languages,
        educations,
      });
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
      const identityId =
        await getIdentityIdByDeveloperProfileId(developerProfileId);

      if (!identityId) {
        return false;
      }

      return checkUserAccess(identityId);
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
    async deleteDeveloperProfile(developerProfileId: string) {
      await deleteDeveloperProfile(developerProfileId);
    },
  };
}
