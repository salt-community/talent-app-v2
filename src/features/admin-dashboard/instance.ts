import { createAdminService } from "./service";
import { iamService } from "../iam";
import {
  backgroundsService,
  developerProfilesService,
} from "../developer-profiles";
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
    isHealthOk: backgroundsService.isSearchHealthOk,
    repopulate: backgroundsService.repopulateMeiliSearch,
    sync: backgroundsService.syncMeilisearch,
    doesNeedSync: backgroundsService.doesMeilisearchNeedSync,
    getSettings: backgroundsService.getMeilisearchSettings,
    updateSettings: backgroundsService.updateMeilisearchSettings,
    resetSettings: backgroundsService.resetMeilisearchSettings,
    ensureSearchIndex: backgroundsService.ensureSearchIndex,
  },
  {
    updateRole: iamService.updateRole,
    getAllIdentities: iamService.getAllIdentities,
    deleteIdentity: iamService.deleteIdentity,
  },
  backgroundsService.deleteBackgroundById,
  projectsService.deleteProjectsByDeveloperProfileId
);
