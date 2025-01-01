import { createAdminService } from "./service";
import { backgroundsService, developerService, iamService } from "@/features";

export const adminService = createAdminService(
  developerService.getAll,
  developerService.delete,
  developerService.updateStatus,
  iamService.checkAccess,
  {
    repopulate: backgroundsService.repopulateMeiliSearch,
    sync: backgroundsService.syncMeilisearch,
    doesNeedSync: backgroundsService.doesMeilisearchNeedSync,
    getSettings: backgroundsService.getMeilisearchSettings,
    updateSettings: backgroundsService.updateMeilisearchSettings,
    resetSettings: backgroundsService.resetMeilisearchSettings,
  },
);
