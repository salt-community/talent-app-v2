import { Repository } from "./repository";
import {
  BackgroundInsert,
  BackgroundUpdate,
  OutboxMessageSelect,
} from "./types";
import { MeiliClient } from "./meili";
import {
  DeleteDeveloperProfile,
  Developer,
  GetAllDeveloperProfiles,
  GetCurrentUser,
  GetDeveloperProfileByIdentityId,
} from "@/features";
import { Settings, TaskStatus } from "meilisearch";
import { backgroundsService } from "./instance";
import { CreateDeveloperProfile, GetAllById } from "@/features";

const OK_STATUSES: TaskStatus[] = ["succeeded", "enqueued", "processing"];
export function createBackgroundsService(
  repository: Repository,
  meiliClient: MeiliClient,
  getPublishedOrHighlightedDeveloperProfileIds: () => Promise<string[]>,
  getDeveloperById: (id: string) => Promise<Developer>,
  getAllDeveloperProfile: GetAllDeveloperProfiles,
  createDeveloperProfile: CreateDeveloperProfile,
  getAllById: GetAllById,
  deleteDeveloperProfile: DeleteDeveloperProfile,
  getAllDeveloperProfilesByIdentityId: GetDeveloperProfileByIdentityId,
  getCurrentUser: GetCurrentUser
) {
  async function updateMeilisearchFor(outboxMessage: OutboxMessageSelect) {
    let succeeded = false;
    switch (outboxMessage.operation) {
      case "upsert":
        const background = await repository.getBackgroundByDeveloperProfileId(
          outboxMessage.developerProfileId
        );
        if (!background) {
          succeeded = true;
          break;
        }
        const upsertStatus = await meiliClient.upsertBackground([
          background[0],
        ]);
        succeeded = OK_STATUSES.includes(upsertStatus);
        break;
      case "delete":
        const deleteStatus = await meiliClient.deleteBackground(
          outboxMessage.developerProfileId
        );
        succeeded = OK_STATUSES.includes(deleteStatus);
        break;
    }
    if (succeeded) {
      await repository.removeOutboxMessage(outboxMessage.id);
    }
  }

  return {
    async getBackgroundByDeveloperProfileId(developerProfileId: string) {
      const background = await repository.getBackgroundById(developerProfileId);
      return background[0];
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

      const status = await meiliClient.upsertBackground([
        { id: backgroundId, ...background },
      ]);
      if (OK_STATUSES.includes(status)) {
        await repository.removeOutboxMessage(outboxMessageId);
      }
    },

    async update(background: BackgroundUpdate) {
      const { outboxMessageId } = await repository.update(background);

      const status = await meiliClient.upsertBackground([background]);
      if (OK_STATUSES.includes(status)) {
        await repository.removeOutboxMessage(outboxMessageId);
      }
    },

    async searchDeveloperProfileIds(search: string | undefined) {
      const cleanSearch = search?.trim();
      const [
        searchedDeveloperProfileIds,
        publishedOrHighlightedDeveloperProfileIds,
      ] = await Promise.all([
        !cleanSearch || cleanSearch === ""
          ? await repository.getAllDeveloperProfileIds()
          : await meiliClient.searchDeveloperProfileIds(search),
        await getPublishedOrHighlightedDeveloperProfileIds(),
      ]);

      const filteredDeveloperProfileIds = searchedDeveloperProfileIds.filter(
        (developerProfileId) =>
          publishedOrHighlightedDeveloperProfileIds.includes(developerProfileId)
      );
      return filteredDeveloperProfileIds;
    },
    async isSearchHealthOk() {
      return await meiliClient.isHealthOk();
    },
    async repopulateMeiliSearch() {
      await meiliClient.deleteAllBackgrounds();
      const backgrounds = await repository.getAllBackgrounds();

      await meiliClient.upsertBackground(backgrounds);
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
    async addDeveloperBackground(id: string) {
      const developer = await getDeveloperById(id);
      await backgroundsService.add({
        name: developer.name,
        developerProfileId: developer.id,
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
      const developerProfile = await createDeveloperProfile(identityId);
      if (developerProfile) {
        await backgroundsService.addDeveloperBackground(developerProfile.id);
      }
    },
    async getAllDeveloperProfilesById(identityId: string) {
      return await getAllById(identityId);
    },
    async deleteDeveloperProfile(developerProfileId: string) {
      await deleteDeveloperProfile(developerProfileId);
    },
    async getAllDeveloperProfile() {
      return await getAllDeveloperProfile();
    },
    async deleteBackgroundById(developerProfileId: string) {
      await repository.deleteBackgroundById(developerProfileId);
    },
    async GetCurrentUsers() {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        return;
      }

      const developerProfile = await getAllDeveloperProfilesByIdentityId(
        currentUser.id
      );
      const user = {
        ...currentUser,
        developerProfile,
      };
      return user;
    },
  };
}
