import { db } from "@/db";

import { createDeveloperProfilesService } from "./service";
import { iamService, secureService } from "../iam";
import { assignmentsService } from "../assignments";

const insecureDeveloperProfilesService = createDeveloperProfilesService(
  db,
  iamService.getCurrentUser,
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

  () => {
    return Promise.resolve([]);
  },
  (): Promise<{
    id: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    title: string;
    comment: string;
    categories: string[];
    cohortId: string;
    slug: string | null;
    description: string | null;
  }> => {
    return Promise.resolve({
      id: "",
      createdAt: null,
      updatedAt: null,
      title: "",
      comment: "",
      categories: [],
      cohortId: "",
      slug: "",
      description: null,
    });
  },
  () => {
    return Promise.resolve(0);
  }
);
