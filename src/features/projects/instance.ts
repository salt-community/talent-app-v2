import { db } from "@/db";
import { createService } from "./service";
import {
  iamService,
  secureService,
  developerProfilesService,
} from "@/features";

const insecurePojectService = createService(
  db,
  developerProfilesService.getAll,
  developerProfilesService.getIdentityIdByDeveloperProfileId,
  iamService.checkUserAccess
);

export const projectsService = secureService("projects", insecurePojectService);

export const seedProjectService = createService(
  db,
  developerProfilesService.getAll,
  developerProfilesService.getIdentityIdByDeveloperProfileId,
  async function checkUserAccess(): Promise<boolean> {
    return true;
  }
);
