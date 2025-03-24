import MeiliSearch, { Embedders, Index, Settings } from "meilisearch";
import { DeveloperProfileDetailsUpdate } from "../types";

type InitializeMeiliSearchIndexArgs = {
  indexUid: string;
  primaryKey: string;
  displayedAttributes: string[];
  searchableAttributes: string[];
  embedders: Embedders | undefined;
  filterableAttributes: string[];
};

export function createSearchApi({
  indexUid,
  primaryKey,
  displayedAttributes,
  searchableAttributes,
  embedders,
  filterableAttributes,
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
        filterableAttributes,
      });
      await index.waitForTask(updateSettingsTask.taskUid);
    },

    async searchDeveloperProfileIds(query: string | undefined) {
      const isSearchEmpty = query === undefined || !query.trim();

      const searchParams = {
        filter: `status = "published" OR status="highlighted"`,
      };

      const documents: Record<string, unknown>[] = isSearchEmpty
        ? (await index.search("", searchParams)).hits
        : (await index.search(query, searchParams)).hits;
      return documents.map((doc) => doc.id as string);
    },

    async searchDeveloperProfiles(query: string | undefined) {
      const isSearchEmpty = query === undefined || !query.trim();
      const llmIsEnabled = process.env.FF_SEMANTIC_SEARCH_ENABLED === "ON";

      const searchParams: Record<
        string,
        boolean | { embedder: string; semanticRatio: number } | string
      > = {
        filter: `status = "published" OR status="highlighted"`,
      };

      if (llmIsEnabled) {
        searchParams.showRankingScore = !isSearchEmpty;
        searchParams.hybrid = { embedder: "openAiSearch", semanticRatio: 0.9 };
      }

      if (isSearchEmpty) {
        return (await index.search("", searchParams)).hits;
      }

      return (await index.search(query, searchParams)).hits;
    },

    async upsertDocuments(developerProfiles: DeveloperProfileDetailsUpdate[]) {
      const response = await index.addDocuments(developerProfiles);
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
