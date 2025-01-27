import { db } from "@/db";

import { createDeveloperProfilesService } from "./service";
import { secureService } from "@/features";

export const insecureDeveloperProfilesService =
  createDeveloperProfilesService(db);

export const developerProfilesService = secureService(
  "developerProfiles",
  insecureDeveloperProfilesService
);
