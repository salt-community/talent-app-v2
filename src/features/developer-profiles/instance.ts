import { db } from "@/db";

import { createDeveloperProfilesService } from "./service";
import { iamService, secureService } from "@/features";

export const insecureDeveloperProfilesService = createDeveloperProfilesService(
  db,
  iamService.getCurrentUser
);

export const developerProfilesService = secureService(
  "developerProfiles",
  insecureDeveloperProfilesService
);

export function getDeveloperProfilesService() {
  return developerProfilesService;
}
