import {
  backgroundsService,
  developerProfilesService,
  iamService,
  projectsService,
  secureService,
} from "@/features";
import { createAdminService } from "./service";

export const insecureAdminService = createAdminService(
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
  },
  {
    updateRole: iamService.updateRole,
    getAllIdentities: iamService.getAllIdentities,
    deleteIdentity: iamService.deleteIdentity,
  },
  backgroundsService.deleteBackgroundById,
  projectsService.deleteProjectsByDeveloperProfileId
);

export const adminService = secureService("admins", insecureAdminService);
