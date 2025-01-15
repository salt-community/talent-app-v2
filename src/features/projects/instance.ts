import { db } from "@/db";
import { createService } from "./service";
import { developerProfilesService } from "../developer-profiles/instance";
import { iamService, secureService } from "@/features";

const insecurePojectService = createService(
  db,
  developerProfilesService.getAll,
  iamService.checkUserAccess
);

export const projectsService = secureService("projects", insecurePojectService);

export const seedProjectService = createService(
  db,
  developerProfilesService.getAll,
  async function checkUserAccess(): Promise<boolean> {
    return true;
  }
);
