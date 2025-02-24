import MeiliSearch, { Index, Settings } from "meilisearch";
import { BackgroundUpdate } from "../types";

type InitializeMeiliSearchIndexArgs = {
  meiliSearch: MeiliSearch;
  indexUid: string;
  primaryKey: string;
  displayedAttributes: string[];
  searchableAttributes: string[];
};

async function initializeMeiliSearchIndex({
  meiliSearch,
  indexUid,
  primaryKey,
  displayedAttributes,
  searchableAttributes,
}: InitializeMeiliSearchIndexArgs) {
  const index = meiliSearch.index(indexUid);

  if (!index) {
    console.log(`Index ${indexUid} not found, creating it...`);

    await meiliSearch.createIndex(indexUid, {
      primaryKey,
    });

    console.log(`Index ${indexUid} created!`);
  }

  // TODO: Move into !index block.
  await index.updateSettings({
    displayedAttributes,
    searchableAttributes,
  });

  return index;
}

export function createBackgroundsSearchApi() {
  let meiliSearch: MeiliSearch | null = null;
  // TODO: Fix the unknown type.
  let backgroundsIndex: Index<Record<string, unknown>> | null = null;

  async function ensureMeiliSearch() {
    if (!meiliSearch) {
      meiliSearch = new MeiliSearch({
        host: process.env.MEILI_SEARCH_URL!,
        apiKey: process.env.MEILI_MASTER_KEY,
      });
    }

    return meiliSearch;
  }

  async function ensureBackgroundsIndex() {
    const meiliSearch = await ensureMeiliSearch();

    if (!backgroundsIndex) {
      backgroundsIndex = await initializeMeiliSearchIndex({
        meiliSearch,
        indexUid: "backgrounds",
        primaryKey: "developerProfileId",
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

    return backgroundsIndex;
  }

  return {
    async isHealthOk() {
      try {
        const meili = await ensureMeiliSearch();
        const health = await meili.health();
        return health.status === "available";
      } catch {
        return false;
      }
    },

    async searchDeveloperProfileIds(search: string | undefined) {
      const index = await ensureBackgroundsIndex();

      const isSearchEmpty = search === undefined || !search.trim();

      let documents: Record<string, unknown>[] | null = null;

      if (isSearchEmpty) {
        const { results } = await index.getDocuments();
        documents = results;
      } else {
        const { hits } = await index.search(search);
        documents = hits;
      }

      return documents.map(
        ({ developerProfileId }) => developerProfileId as string
      );
    },

    async upsertBackgrounds(backgrounds: BackgroundUpdate[]) {
      const index = await ensureBackgroundsIndex();
      const response = await index.addDocuments(backgrounds);
      return response.status;
    },

    async deleteBackground(developerProfileId: string) {
      const index = await ensureBackgroundsIndex();
      const response = await index.deleteDocument(developerProfileId);
      return response.status;
    },

    async deleteAllBackgrounds() {
      const index = await ensureBackgroundsIndex();
      await index.delete();
    },

    async getSettings() {
      const index = await ensureBackgroundsIndex();
      const settings = await index.getSettings();
      return settings;
    },

    async updateSettings(settings: Settings) {
      const index = await ensureBackgroundsIndex();
      const task = await index.updateSettings(settings);
      const updateSettingsTask = await index.waitForTask(task.taskUid);
      return updateSettingsTask.status;
    },

    async resetSettings() {
      const index = await ensureBackgroundsIndex();
      const task = await index.resetSettings();
      const resetSettingsTask = await index.waitForTask(task.taskUid);
      return resetSettingsTask.status;
    },
  };
}

export type BackgroundsSearchApi = ReturnType<
  typeof createBackgroundsSearchApi
>;
