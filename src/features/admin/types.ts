import { BackgroundsService } from "../backgrounds/types";

export type SearchConfigurationClient = {
  isHealthOk: BackgroundsService["isSearchHealthOk"];
  repopulate: BackgroundsService["repopulateMeiliSearch"];
  sync: BackgroundsService["syncMeilisearch"];
  doesNeedSync: BackgroundsService["doesMeilisearchNeedSync"];
  getSettings: BackgroundsService["getMeilisearchSettings"];
  updateSettings: BackgroundsService["updateMeilisearchSettings"];
  resetSettings: BackgroundsService["resetMeilisearchSettings"];
};

export type Synonym = [string, string[]];
