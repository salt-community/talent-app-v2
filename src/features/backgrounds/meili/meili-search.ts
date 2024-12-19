import MeiliSearch from "meilisearch";

export function createMeiliSearch() {
  return new MeiliSearch({
    host: process.env.MEILI_SEARCH_URL!,
    apiKey: process.env.MEILI_MASTER_KEY,
  });
}
