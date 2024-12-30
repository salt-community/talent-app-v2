import MeiliSearch from "meilisearch";
import { BackgroundUpdate } from "../types";
import { createMeiliSearch } from "./meili-search";

const BACKGROUNDS_UID = "backgrounds";
const PRIMARY_KEY = "devId";

export function createMeiliClient() {
  let meiliSearch: MeiliSearch | null = null;

  function getMeiliSearch() {
    if (!meiliSearch) meiliSearch = createMeiliSearch();
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
      return await getMeiliSearch().waitForTask(response.taskUid);
    },

    async deleteBackground(devId: string) {
      const index = getMeiliSearch().index(BACKGROUNDS_UID);
      const response = await index.deleteDocument(devId);
      return await getMeiliSearch().waitForTask(response.taskUid);
    },
    async deleteAllBackgrounds() {
      const index = getMeiliSearch().index(BACKGROUNDS_UID);
      const response = await index.deleteAllDocuments();
      return await getMeiliSearch().waitForTask(response.taskUid);
    },
  };
}

export type MeiliClient = ReturnType<typeof createMeiliClient>;
