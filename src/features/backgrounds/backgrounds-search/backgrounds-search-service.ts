import { Settings } from "meilisearch";
import { BackgroundsSearchApi } from "./backgrounds-search-api";

export function createBackgroundsSearchService(
  backgroundsSearchApi: BackgroundsSearchApi
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
  };
}
