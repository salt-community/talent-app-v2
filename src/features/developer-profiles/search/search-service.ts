import { Settings } from "meilisearch";
import { SearchApi } from "./search-api";
import { CvInfo } from "../types";

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

    async searchDeveloperProfiles(search: string | undefined) {
      return (await searchApi.searchDeveloperProfiles(search))
        .map((doc) => doc as CvInfo);
    },

    async searchDeveloperProfilesWithLLM(search: string | undefined) {
      return (await searchApi.searchDeveloperProfiles(search, { useLLM: true }))
        .map((doc) => {
          const rawRankingScore = doc._rankingScore as number | undefined;
          const rankingScore =
            rawRankingScore !== undefined
              ? Math.round((rawRankingScore as number) * 100)
              : undefined;
          return {
            ...doc,
            ranking: rankingScore,
          } as CvInfo & { ranking: number | undefined };
        });
    },

    async ensureSearchIndex() {
      console.log("Ensuring search indexes...");
      await searchApi.ensureIndex();
      console.log("Ensured search indexes!");
    },
  };
}
