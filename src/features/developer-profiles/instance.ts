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
  assignmentsService.getAssignmentBySlug,
  assignmentsService.getAverageScoresByIdentityId
);

export const developerProfilesService = secureService(
  "developerProfiles",
  insecureDeveloperProfilesService
);

export const developerProfilesSeedingService = createDeveloperProfilesService(
  db,
  (): Promise<{ id: string; role: string } | null> => {
    return Promise.resolve({ id: "", role: "" });
  },
  (): Promise<string> => {
    return Promise.resolve("");
  },
  () => {
    return Promise.resolve([]);
  },
  (): Promise<{
    id: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    title: string;
    cohortId: string;
    comment: string | null;
    categories: string[] | null;
    slug: string | null;
  }> => {
    return Promise.resolve({
      id: "",
      createdAt: null,
      updatedAt: null,
      title: "",
      cohortId: "",
      comment: "",
      categories: [""],
      slug: "",
    });
  },
  () => {
    return Promise.resolve(0);
  }
);
