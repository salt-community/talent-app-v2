import { createAdminService } from "./service";
import {
  backgroundsService,
  developerProfilesService,
  iamService,
  assignmentsService,
} from "@/features";

export const adminService = createAdminService(
  developerProfilesService.getAll,
  developerProfilesService.delete,
  developerProfilesService.updateStatus,
  assignmentsService.createAssignment,
  iamService.checkAccess,
  {
    isHealthOk: backgroundsService.isSearchHealthOk,
    repopulate: backgroundsService.repopulateMeiliSearch,
    sync: backgroundsService.syncMeilisearch,
    doesNeedSync: backgroundsService.doesMeilisearchNeedSync,
    getSettings: backgroundsService.getMeilisearchSettings,
    updateSettings: backgroundsService.updateMeilisearchSettings,
    resetSettings: backgroundsService.resetMeilisearchSettings,
  }
);
