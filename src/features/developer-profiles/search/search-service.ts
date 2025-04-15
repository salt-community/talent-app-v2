import { Settings } from "meilisearch";
import { SearchApi } from "./search-api";

export function createSearchService(searchApi: SearchApi) {
  return {
    async isSearchHealthOk() {
      return await searchApi.isHealthOk();
    },

    async geSearchSettings() {
      return await searchApi.getSettings();
    },

    async updateSearchSettings(settings: Settings) {
      await searchApi.updateSettings(settings);
    },

    async resetSearchSettings() {
      await searchApi.resetSettings();
    },

    async searchDeveloperProfileIds(search: string | undefined) {
      return searchApi.searchDeveloperProfileIds(search);
    },

    async searchDeveloperProfileIdsWithLLM(search: string | undefined) {
      return (await searchApi.searchDeveloperProfiles(search)).map((doc) => {
        const rawRankingScore = doc._rankingScore as number | undefined;
        const rankingScore =
          rawRankingScore !== undefined
            ? Math.round((rawRankingScore as number) * 100)
            : undefined;
        return {
          id: doc.id as string,
          ranking: rankingScore,
        };
      });
    },

    async ensureSearchIndex() {
      console.log("Ensuring search indexes...");
      await searchApi.ensureIndex();
      console.log("Ensured search indexes!");
    },
  };
}
