import { db } from "@/db";

import { iamService, secureService } from "@/features";
import { createDeveloperProfilesService } from "./service";

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
