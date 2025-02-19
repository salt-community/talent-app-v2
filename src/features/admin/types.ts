import { BackgroundsService } from "../backgrounds/types";
import { createAdminService } from "./service";

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

type Identity = {
  name: string;
  id: string;
  email: string;
  clerkId: string;
  role: string;
};
export type AdminsService = ReturnType<typeof createAdminService>;
