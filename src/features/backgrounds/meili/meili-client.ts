import MeiliSearch, { Settings } from "meilisearch";
import { BackgroundUpdate } from "../types";
import { createMeiliSearch } from "./meili-search";

const BACKGROUNDS_UID = "backgrounds";
const PRIMARY_KEY = "devId";

export function createMeiliClient() {
  let meiliSearch: MeiliSearch | null = null;

  function getMeiliSearch() {
    if (!meiliSearch) {
      meiliSearch = createMeiliSearch();
      meiliSearch.index(BACKGROUNDS_UID).updateSettings({
        displayedAttributes: ["devId"],
        searchableAttributes: [
          "skills",
          "educations",
          "languages",
          "name",
          "title",
          "bio",
        ],
      });
    }
    return meiliSearch;
  }

  return {
    async searchDevIds(search: string | undefined) {
      const index = getMeiliSearch().index(BACKGROUNDS_UID);
      const response = await index.search(search);
      return response.hits.map((hit) => hit.devId as string);
    },

    async upsertBackground(background: BackgroundUpdate) {
      const index = getMeiliSearch().index(BACKGROUNDS_UID);
      const response = await index.addDocuments([background], {
        primaryKey: PRIMARY_KEY,
      });
      return response.status;
    },

    async deleteBackground(devId: string) {
      const index = getMeiliSearch().index(BACKGROUNDS_UID);
      const response = await index.deleteDocument(devId);
      return response.status;
    },
    async deleteAllBackgrounds() {
      const index = getMeiliSearch().index(BACKGROUNDS_UID);
      const response = await index.deleteAllDocuments();
      await index.waitForTask(response.taskUid);
      return response.status;
    },
    async isHealthOk() {
      try {
        const health = await getMeiliSearch().health();
        return health.status === "available";
      } catch {
        return false;
      }
    },
    async getSettings() {
      const index = getMeiliSearch().index(BACKGROUNDS_UID);
      const settings = await index.getSettings();
      return settings;
    },
    async updateSettings(settings: Settings) {
      const index = getMeiliSearch().index(BACKGROUNDS_UID);
      const task = await index.updateSettings(settings);
      const updateSettingsTask = await index.waitForTask(task.taskUid);
      return updateSettingsTask.status;
    },
    async resetSettings() {
      const index = getMeiliSearch().index(BACKGROUNDS_UID);
      const task = await index.resetSettings();
      const resetSettingsTask = await index.waitForTask(task.taskUid);
      return resetSettingsTask.status;
    },
  };
}

export type MeiliClient = ReturnType<typeof createMeiliClient>;
