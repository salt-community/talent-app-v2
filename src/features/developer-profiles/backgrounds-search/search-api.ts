import MeiliSearch, { Embedders, Index, Settings } from "meilisearch";
import { BackgroundUpdate } from "../types";

type InitializeMeiliSearchIndexArgs = {
  indexUid: string;
  primaryKey: string;
  displayedAttributes: string[];
  searchableAttributes: string[];
  embedders: Embedders | undefined;
};

export function createSearchApi({
  indexUid,
  primaryKey,
  displayedAttributes,
  searchableAttributes,
  embedders,
}: InitializeMeiliSearchIndexArgs) {
  const meiliSearch = new MeiliSearch({
    host: process.env.MEILI_SEARCH_URL!,
    apiKey: process.env.MEILI_MASTER_KEY,
  });

  // TODO: Fix the unknown type.
  const index: Index<Record<string, unknown>> = meiliSearch.index(indexUid);
  return {
    async isHealthOk() {
      try {
        const health = await meiliSearch.health();
        return health.status === "available";
      } catch {
        return false;
      }
    },

    async ensureIndex() {
      const index = meiliSearch.index(indexUid);

      const createIndexTask = await meiliSearch.createIndex(indexUid, {
        primaryKey,
      });
      await index.waitForTask(createIndexTask.taskUid);

      const updateSettingsTask = await index.updateSettings({
        displayedAttributes,
        searchableAttributes,
        embedders,
      });
      await index.waitForTask(updateSettingsTask.taskUid);
    },

    async searchDeveloperProfileIds(search: string | undefined) {
      const isSearchEmpty = search === undefined || !search.trim();

      const documents: Record<string, unknown>[] = isSearchEmpty
        ? (await index.getDocuments()).results
        : (await index.search(search)).hits;

      return documents.map((doc) => doc.developerProfileId as string);
    },

    async searchDeveloperProfiles(search: string | undefined) {
      const isSearchEmpty = search === undefined || !search.trim();

      const llmIsEnabled = process.env.FF_SEMANTIC_SEARCH_ENABLED === "ON";
      if (isSearchEmpty) return (await index.getDocuments()).results;

      search = llmIsEnabled
        ? `Looking for a candidate that would fit to following job ad: ${search}`
        : search;
      const searchParams = llmIsEnabled
        ? {
            showRankingScore: true,
            hybrid: { embedder: "openAiSearch", semanticRatio: 0.9 },
          }
        : undefined;
      return (await index.search(search, searchParams)).hits;
    },

    async upsertDocuments(backgrounds: BackgroundUpdate[]) {
      const response = await index.addDocuments(backgrounds);
      return response.status;
    },

    async deleteDocument(developerProfileId: string) {
      const response = await index.deleteDocument(developerProfileId);
      return response.status;
    },

    async deleteIndex() {
      const task = await index.delete();
      await index.waitForTask(task.taskUid);
    },

    async getSettings() {
      return index.getSettings();
    },

    async updateSettings(settings: Settings) {
      const task = await index.updateSettings(settings);
      const updateSettingsTask = await index.waitForTask(task.taskUid);
      return updateSettingsTask.status;
    },

    async resetSettings() {
      const task = await index.resetSettings();
      const resetSettingsTask = await index.waitForTask(task.taskUid);
      return resetSettingsTask.status;
    },
  };
}

export type SearchApi = ReturnType<typeof createSearchApi>;
