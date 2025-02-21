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
  iamService.updateRole,
  iamService.getAllIdentities,
  iamService.deleteIdentity,
  developerProfilesService.deleteByIdentityId,
  cohortsService.deleteCohortIdentity,
  backgroundsService.deleteBackgroundById,
  projectsService.deleteProjectsByDeveloperProfileId,
  developerProfilesService.getAllById
);

export const adminService = secureService("admins", insecureAdminService);
