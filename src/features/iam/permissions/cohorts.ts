import type { CohortsService } from "@/features/cohorts/service";
import { PermissionsSchema } from "../secure-service";

export const cohorts: PermissionsSchema<"cohorts", CohortsService> = {
  addCohort: "cohorts.addCohort",
  getCohortById: "cohorts.getCohortById",
  getAll: "cohorts.getAll",
  deleteCohort: "cohorts.deleteCohort",
  updateCohortStatus: "cohorts.updateCohortStatus",
  getCohortStudents: "cohorts.getCohortStudents",
  getAllUnassignedDevelopers: "cohorts.getAllUnassignedDevelopers",
  addDeveloperToCohort: "cohorts.addDeveloperToCohort",
  deleteCohortIdentity: "cohorts.deleteCohortIdentity",
  addDevelopersToCohort: "cohorts.addDevelopersToCohort",
};
