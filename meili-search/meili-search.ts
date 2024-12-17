import MeiliSearch from "meilisearch";

export const meiliSearch = new MeiliSearch({
  host: process.env.MEILI_SEARCH_URL!,
  apiKey: process.env.MEILI_MASTER_KEY,
});
