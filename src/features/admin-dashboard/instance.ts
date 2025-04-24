import { developerProfilesService } from "../developer-profiles";
import { iamService } from "../iam";
import { projectsService } from "../projects";
import { createAdminService } from "./service";

export const adminService = createAdminService(
  {
    delete: developerProfilesService.delete,
    updateDeveloperProfile: developerProfilesService.updateDeveloperProfile,
    deleteDeveloperProfileByIdentityId:
      developerProfilesService.deleteByIdentityId,
    getDeveloperProfileIdById: developerProfilesService.getAllById,
    deleteDeveloperProfileFromSearch:
      developerProfilesService.deleteDeveloperProfileFromSearch,
  },
  {
    isHealthOk: developerProfilesService.isSearchHealthOk,
    repopulate: developerProfilesService.repopulateSearch,
    sync: developerProfilesService.syncSearch,
    doesNeedSync: developerProfilesService.isSearchSyncRequired,
    getSettings: developerProfilesService.geSearchSettings,
    updateSettings: developerProfilesService.updateSearchSettings,
    resetSettings: developerProfilesService.resetSearchSettings,
    ensureSearchIndex: developerProfilesService.ensureSearchIndex,
  },
  {
    updateRole: iamService.updateRole,
    getAllIdentities: iamService.getAllIdentities,
    deleteIdentity: iamService.deleteIdentity,
  },
  projectsService.deleteProjectsByDeveloperProfileId,
);
