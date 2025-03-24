import {
  DeveloperProfilesService,
  DevelopersService,
} from "../developer-profiles";
import { createService } from "../iam/service";
import { createAdminService } from "./service";

export type SearchConfigurationClient = {
  isHealthOk: DeveloperProfilesService["isSearchHealthOk"];
  repopulate: DeveloperProfilesService["repopulateSearch"];
  sync: DeveloperProfilesService["syncSearch"];
  doesNeedSync: DevelopersService["isSearchSyncRequired"];
  getSettings: DeveloperProfilesService["geSearchSettings"];
  updateSettings: DeveloperProfilesService["updateSearchSettings"];
  resetSettings: DeveloperProfilesService["resetSearchSettings"];
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
  updateDeveloperProfile: DevelopersService["updateDeveloperProfile"];
  deleteDeveloperProfileByIdentityId: DevelopersService["deleteByIdentityId"];
  getDeveloperProfileIdById: DevelopersService["getAllById"];
  deleteDeveloperProfileFromSearch: DevelopersService["deleteDeveloperProfileFromSearch"];
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
