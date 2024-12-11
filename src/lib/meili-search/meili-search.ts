import MeiliSearch from "meilisearch";

export const meiliSearch = new MeiliSearch({
  host: "http://localhost:7700",
  apiKey: process.env.MEILI_MASTER_KEY,
});
