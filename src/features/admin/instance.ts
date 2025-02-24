import {
  backgroundsService,
  cohortsService,
  developerProfilesService,
  iamService,
  projectsService,
  secureService,
} from "@/features";
import { createAdminService } from "./service";

export const insecureAdminService = createAdminService(
  developerProfilesService.delete,
  developerProfilesService.updateStatus,
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
  developerProfilesService.deleteByIdentityId,
  backgroundsService.deleteBackgroundById,
  projectsService.deleteProjectsByDeveloperProfileId,
  developerProfilesService.getAllById
);

export const adminService = secureService("admins", insecureAdminService);
