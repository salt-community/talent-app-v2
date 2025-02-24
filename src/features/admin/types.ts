import { BackgroundsService } from "../backgrounds/types";
import { DevelopersService } from "../developer-profiles";
import { iamService } from "../iam/types";
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

export type IamClient = {
  updateRole: iamService["updateRole"];
  getAllIdentities: iamService["getAllIdentities"];
  deleteIdentity: iamService["deleteIdentity"];
};

export type DeveloperProfileClient = {
  delete: DevelopersService["delete"];
  updateStatus: DevelopersService["updateStatus"];
  deleteDeveloperProfileByIdentityId: DevelopersService["deleteByIdentityId"];
  getDeveloperProfileIdById: DevelopersService["getAllById"];
};

export type Synonym = [string, string[]];

export type Identity = {
  name: string;
  id: string;
  email: string;
  clerkId: string;
  role: string;
};

export type Developer = {
  name: string;
  id: string;
  identityId: string | null;
  email: string;
  status: string;
};

export type AdminsService = ReturnType<typeof createAdminService>;
