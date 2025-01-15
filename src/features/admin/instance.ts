import { createAdminService } from "./service";
import {
  backgroundsService,
  developerProfilesService,
  iamService,
} from "@/features";

export const adminService = createAdminService(
  developerProfilesService.getAll,
  developerProfilesService.delete,
  developerProfilesService.updateStatus,
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
