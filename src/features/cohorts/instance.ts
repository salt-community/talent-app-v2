import { db } from "@/db";
import { createCohortsService } from "./service";
import { iamService, secureService } from "@/features";

export const insecureCohortService = createCohortsService(
  db,
  iamService.getIdentityById,
  iamService.getAllUnassignedDevelopers,
  iamService.updateCohort
);

export const cohortsService = secureService("cohorts", insecureCohortService);
