import { db } from "@/db";
import { createService } from "./service";
import {
  iamService,
  secureService,
  developerProfilesService,
  insecureDeveloperProfilesService,
} from "@/features";
import { createApi } from "./api";

export const insecureProjectService = createService(
  db,
  createApi(),
  iamService.hasCurrentUserAccess
);

export const projectsService = secureService(
  "projects",
  insecureProjectService
);

export const seedProjectService = createService(
  db,
  {
    getAllIssues: async () => "NA",
    getLastCommit: async () => "NA",
    getTotalOfCommits: async () => "NA",
    testPagePerformance: async () => "NA",
  },
  async function checkUserAccess(): Promise<boolean> {
    return true;
  }
);
