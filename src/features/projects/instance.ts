import { db } from "@/db";
import { createService } from "./service";
import {
  iamService,
  secureService,
  developerProfilesService,
  insecureDeveloperProfilesService,
} from "@/features";
import { createApi } from "./api";

export const insecurePojectService = createService(
  db,
  createApi(),
  developerProfilesService.getAll,
  developerProfilesService.getIdentityIdByDeveloperProfileId,
  iamService.checkUserAccess
);

export const projectsService = secureService("projects", insecurePojectService);

export const seedProjectService = createService(
  db,
  {
    getAllIssues: async () => "NA",
    getLastCommit: async () => "NA",
    getTotalOfCommits: async () => "NA",
    testPagePerformance: async () => "NA",
  },
  insecureDeveloperProfilesService.getAll,
  insecureDeveloperProfilesService.getIdentityIdByDeveloperProfileId,
  async function checkUserAccess(): Promise<boolean> {
    return true;
  }
);
