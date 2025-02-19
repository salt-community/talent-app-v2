import MeiliSearch, { Settings } from "meilisearch";
import { BackgroundUpdate } from "../types";
import { createMeiliSearch } from "./meili-search";

const BACKGROUNDS_UID = "backgrounds";
const PRIMARY_KEY = "developerProfileId";

export function createMeiliClient() {
  let meiliSearch: MeiliSearch | null = null;

  async function initializeMeiliSearch() {
    if (!meiliSearch) {
      meiliSearch = createMeiliSearch();

      const index = meiliSearch.index(BACKGROUNDS_UID);

      if (!index) {
        console.error("Index does not exist. Creating index now...");
        await meiliSearch.createIndex(BACKGROUNDS_UID, {
          primaryKey: PRIMARY_KEY,
        });
      }

      await index.updateSettings({
        displayedAttributes: ["developerProfileId"],
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
    async searchDeveloperProfileIds(search: string | undefined) {
      const meili = await initializeMeiliSearch();
      const index = meili.index(BACKGROUNDS_UID);
      const response = await index.search(search);
      return response.hits.map((hit) => hit.developerProfileId as string);
    },

    async upsertBackground(background: BackgroundUpdate[]) {
      const meili = await initializeMeiliSearch();
      const index = meili.index(BACKGROUNDS_UID);
      const response = await index.addDocuments(background, {
        primaryKey: PRIMARY_KEY,
      });
      return response.status;
    },

    async deleteBackground(developerProfileId: string) {
      const meili = await initializeMeiliSearch();
      const index = meili.index(BACKGROUNDS_UID);
      const response = await index.deleteDocument(developerProfileId);
      console.log("works", response);
      return response.status;
    },


    async deleteAllBackgrounds() {
      const meiliSearch = await initializeMeiliSearch();
      const index = meiliSearch.index(BACKGROUNDS_UID);
      await index.delete();
      await meiliSearch.createIndex(BACKGROUNDS_UID);
    },

    async isHealthOk() {
      try {
        const meili = await initializeMeiliSearch();
        const health = await meili.health();
        return health.status === "available";
      } catch {
        return false;
      }
    },

    async getSettings() {
      const meili = await initializeMeiliSearch();
      const index = meili.index(BACKGROUNDS_UID);
      const settings = await index.getSettings();
      return settings;
    },

    async updateSettings(settings: Settings) {
      const meili = await initializeMeiliSearch();
      const index = meili.index(BACKGROUNDS_UID);
      const task = await index.updateSettings(settings);
      const updateSettingsTask = await index.waitForTask(task.taskUid);
      return updateSettingsTask.status;
    },

    async resetSettings() {
      const meili = await initializeMeiliSearch();
      const index = meili.index(BACKGROUNDS_UID);
      const task = await index.resetSettings();
      const resetSettingsTask = await index.waitForTask(task.taskUid);
      return resetSettingsTask.status;
    },
  };
}

export type MeiliClient = ReturnType<typeof createMeiliClient>;
