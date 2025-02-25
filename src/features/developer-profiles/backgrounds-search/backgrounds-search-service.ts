import { Settings } from "meilisearch";
import { SearchApi } from "./search-api";

export function createBackgroundsSearchService(
  backgroundsSearchApi: SearchApi,
) {
  return {
    async isSearchHealthOk() {
      return await backgroundsSearchApi.isHealthOk();
    },

    async getMeilisearchSettings() {
      return await backgroundsSearchApi.getSettings();
    },

    async updateMeilisearchSettings(settings: Settings) {
      await backgroundsSearchApi.updateSettings(settings);
    },

    async resetMeilisearchSettings() {
      await backgroundsSearchApi.resetSettings();
    },

    async searchDeveloperProfileIds(search: string | undefined) {
      return backgroundsSearchApi.searchDeveloperProfileIds(search);
    },

    async searchDeveloperProfileIdsWithLLM(search: string | undefined) {
      return backgroundsSearchApi.searchDeveloperProfileIds(search, true);
    },

    async ensureSearchIndex() {
      console.log("Ensuring search indexes...");
      await backgroundsSearchApi.ensureIndex();
      console.log("Ensured search indexes!");
    },
  };
}
