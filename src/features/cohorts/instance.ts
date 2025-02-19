import { db } from "@/db";
import {
  developerProfilesService,
  iamService,
  secureService,
} from "@/features";
import { createCohortsService } from "./service";

export const insecureCohortService = createCohortsService(
  db,
  iamService.getIdentityById,
  iamService.getAllUnassignedDevelopers,
  developerProfilesService.getDeveloperProfileByIdentityId
);

export const cohortsService = secureService("cohorts", insecureCohortService);
