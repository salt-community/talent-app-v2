import { createAdminService } from "./service";
import {
  backgroundsService,
  developerProfilesService,
  assignmentsService,
  cohortsService,
  getAllAssignmentsAction,
} from "@/features";
const x = {
  getAll: developerProfilesService.getAll,
  delete: developerProfilesService.delete,
  updateStatus: developerProfilesService.updateStatus,
  createAssignment: assignmentsService.createAssignment,
  getAllAssignments: assignmentsService.getAllAssignments,
  getAllCohorts: cohortsService.getAll,
};
export const internalService = createAdminService(
  developerProfilesService.getAll,
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
  }
);
const secureService = { ...x, ...internalService };
