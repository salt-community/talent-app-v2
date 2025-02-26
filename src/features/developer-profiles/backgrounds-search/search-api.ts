import MeiliSearch, { Index, Settings } from "meilisearch";
import { BackgroundUpdate } from "../types";

type InitializeMeiliSearchIndexArgs = {
  indexUid: string;
  primaryKey: string;
  displayedAttributes: string[];
  searchableAttributes: string[];
};

export function createSearchApi({
  indexUid,
  primaryKey,
  displayedAttributes,
  searchableAttributes,
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
        embedders: {
          openAiSearch: {
            source: "openAi",
            model: "text-embedding-3-large",
            apiKey: process.env.OPENAI_API_KEY,
            dimensions: 3072,
            documentTemplate: `{{doc.title}} with skills: {{doc.skills}},
          education: {{doc.educations}}, languages: {{doc.languages}}, bio: {{doc.bio}}`,
          },
        },
      });
      await index.waitForTask(updateSettingsTask.taskUid);
    },

    async searchDeveloperProfileIds(
      search: string | undefined,
      useLLM: boolean = false,
    ) {
      const isSearchEmpty = search === undefined || !search.trim();

      let documents: Record<string, unknown>[] | null = null;

      if (isSearchEmpty) {
        const { results } = await index.getDocuments();
        documents = results;
      } else {
        search = useLLM
          ? `Looking for a candidate that would fit to following job ad: ${search}`
          : search;
        const searchParams = useLLM
          ? {
              hybrid: { embedder: "openAiSearch", semanticRatio: 0.9 },
            }
          : undefined;

        const { hits } = await index.search(search, searchParams);
        documents = hits;
      }

      return documents.map(
        ({ developerProfileId }) => developerProfileId as string,
      );
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
