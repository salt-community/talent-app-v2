import { db } from "@/db";
import { createService } from "./service";
import { developerService } from "../developer-profiles/instance";
import { iamService, secureService } from "@/features";

const insecurePojectService = createService(
  db,
  developerService.getAll,
  iamService.checkUserAccess
);

export const projectsService = secureService("projects", insecurePojectService);

export const seedProjectService = createService(
  db,
  developerService.getAll,
  async function checkUserAccess(): Promise<boolean> {
    return true;
  }
);
