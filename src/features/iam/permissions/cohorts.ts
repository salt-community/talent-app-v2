import type { CohortsService } from "@/features/cohorts/service";
import { PermissionsSchema } from "../secure-service";

export const cohorts: PermissionsSchema<"cohorts", CohortsService> = {
  addCohort: "cohorts.addCohort",
  getCohortStudents: "cohorts.getCohortStudents",
  addDevelopersToCohort: "cohorts.addDevelopersToCohort",
  deleteCohortAndCohortIdentity: "cohorts.deleteCohortAndCohortIdentity",
  deleteIdentityFromCohort: "cohorts.deleteIdentityFromCohort",
  getAll: "cohorts.getAll"
};
