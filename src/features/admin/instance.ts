import { createAdminService } from "./service";
import {
  backgroundsService,
  developerProfilesService,
  iamService,
  assignmentsService,
  cohortsService,
  projectsService,
} from "@/features";

export const adminService = createAdminService(
  developerProfilesService.getAll,
  developerProfilesService.delete,
  developerProfilesService.updateStatus,
  assignmentsService.createAssignment,
  assignmentsService.getAllAssignments,
  cohortsService.getAll,
  iamService.checkAccess,
  {
    isHealthOk: backgroundsService.isSearchHealthOk,
    repopulate: backgroundsService.repopulateMeiliSearch,
    sync: backgroundsService.syncMeilisearch,
    doesNeedSync: backgroundsService.doesMeilisearchNeedSync,
    getSettings: backgroundsService.getMeilisearchSettings,
    updateSettings: backgroundsService.updateMeilisearchSettings,
    resetSettings: backgroundsService.resetMeilisearchSettings,
  },
  iamService.deleteIdentity,
  developerProfilesService.deleteByIdentityId,
  cohortsService.deleteCohortIdentity,
  backgroundsService.deleteBackgroundById,
  assignmentsService.deleteAssignmentScoreById,
  projectsService.deleteProjectsByDeveloperProfileId
);
