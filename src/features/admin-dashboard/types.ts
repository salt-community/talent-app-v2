import {
  DeveloperProfilesService,
  DevelopersService,
} from "../developer-profiles";
import { createService } from "../iam/service";
import { createAdminService } from "./service";

export type SearchConfigurationClient = {
  isHealthOk: DeveloperProfilesService["isSearchHealthOk"];
  repopulate: DeveloperProfilesService["repopulateMeiliSearch"];
  sync: DeveloperProfilesService["syncMeilisearch"];
  doesNeedSync: DevelopersService["doesMeilisearchNeedSync"];
  getSettings: DeveloperProfilesService["getMeilisearchSettings"];
  updateSettings: DeveloperProfilesService["updateMeilisearchSettings"];
  resetSettings: DeveloperProfilesService["resetMeilisearchSettings"];
  ensureSearchIndex: DeveloperProfilesService["ensureSearchIndex"];
};
type iamService = ReturnType<typeof createService>;
export type IamService = {
  updateRole: iamService["updateRole"];
  getAllIdentities: iamService["getAllIdentities"];
  deleteIdentity: iamService["deleteIdentity"];
};

export type DeveloperProfileService = {
  delete: DevelopersService["delete"];
  updateStatus: DevelopersService["updateStatus"];
  deleteDeveloperProfileByIdentityId: DevelopersService["deleteByIdentityId"];
  getDeveloperProfileIdById: DevelopersService["getAllById"];
  deleteMeiliSearchDocument: DevelopersService["deleteMeiliSearchDocument"];
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

export type FilterStatusDevelopers = {
  highlighted: boolean;
  published: boolean;
  unpublished: boolean;
};
export type FilterStatusRole = {
  developer: boolean;
  core: boolean;
  admin: boolean;
};

export type AdminsService = ReturnType<typeof createAdminService>;
