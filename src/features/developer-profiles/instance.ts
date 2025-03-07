import { db } from "@/db";

import { createDeveloperProfilesService } from "./service";
import { iamService, secureService } from "../iam";
import { cohortsService } from "../cohorts";
import { assignmentsService } from "../assignments";

const insecureDeveloperProfilesService = createDeveloperProfilesService(
  db,
  iamService.getCurrentUser,
  cohortsService.getCohortIdByIdentityId,
  assignmentsService.getScoredAssignmentsByCohortIdAndIdentityId,
  assignmentsService.getAssignmentBySlug
);

export const developerProfilesService = secureService(
  "developerProfiles",
  insecureDeveloperProfilesService
);

export function getDeveloperProfilesService() {
  return developerProfilesService;
}
