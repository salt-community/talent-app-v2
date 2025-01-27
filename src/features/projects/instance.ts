import { db } from "@/db";
import { createService } from "./service";
import {
  iamService,
  secureService,
  developerProfilesService,
  insecureDeveloperProfilesService,
} from "@/features";

export const insecurePojectService = createService(
  db,
  developerProfilesService.getAll,
  developerProfilesService.getIdentityIdByDeveloperProfileId,
  iamService.checkUserAccess
);

export const projectsService = secureService("projects", insecurePojectService);

export const seedProjectService = createService(
  db,
  insecureDeveloperProfilesService.getAll,
  insecureDeveloperProfilesService.getIdentityIdByDeveloperProfileId,
  async function checkUserAccess(): Promise<boolean> {
    return true;
  }
);
