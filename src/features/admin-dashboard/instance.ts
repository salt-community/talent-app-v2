import { createAdminService } from "./service";
import { iamService } from "../iam";
import { developerProfilesService } from "../developer-profiles";
import { projectsService } from "../projects";

export const adminService = createAdminService(
  {
    delete: developerProfilesService.delete,
    updateStatus: developerProfilesService.updateStatus,
    deleteDeveloperProfileByIdentityId:
      developerProfilesService.deleteByIdentityId,
    getDeveloperProfileIdById: developerProfilesService.getAllById,
  },
  {
    isHealthOk: developerProfilesService.isSearchHealthOk,
    repopulate: developerProfilesService.repopulateMeiliSearch,
    sync: developerProfilesService.syncMeilisearch,
    doesNeedSync: developerProfilesService.doesMeilisearchNeedSync,
    getSettings: developerProfilesService.getMeilisearchSettings,
    updateSettings: developerProfilesService.updateMeilisearchSettings,
    resetSettings: developerProfilesService.resetMeilisearchSettings,
    ensureSearchIndex: developerProfilesService.ensureSearchIndex,
  },
  {
    updateRole: iamService.updateRole,
    getAllIdentities: iamService.getAllIdentities,
    deleteIdentity: iamService.deleteIdentity,
  },
  developerProfilesService.deleteBackgroundById,
  projectsService.deleteProjectsByDeveloperProfileId
);
