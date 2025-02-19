import { createAdminService } from "./service";
import {
  backgroundsService,
  developerProfilesService,
  iamService,
  assignmentsService,
  cohortsService,
  projectsService,
  secureService,
} from "@/features";

export const insecureAdminService = createAdminService(
  developerProfilesService.delete,
  developerProfilesService.updateStatus,
  assignmentsService.createAssignment,
  assignmentsService.getAllAssignments,
  cohortsService.getAll,
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
  assignmentsService.deleteAssignmentScoreById,
  projectsService.deleteProjectsByDeveloperProfileId,
  developerProfilesService.getAllById
);

export const adminService = secureService("admins", insecureAdminService);
