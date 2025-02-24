import { db } from "@/db";
import { iamService, secureService } from "@/features";
import { createCohortsService } from "./service";

export const insecureCohortService = createCohortsService(
  db,
  iamService.getIdentityById,
  iamService.getAllUnassignedDevelopers
);

export const cohortsService = secureService("cohorts", insecureCohortService);
