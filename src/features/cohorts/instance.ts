import { db } from "@/db";
import { createCohortsService } from "./service";
import { iamService, secureService } from "../iam";

const insecureCohortService = createCohortsService(
  db,
  iamService.getIdentityById,
  iamService.getAllUnassignedDevelopers
);

export const cohortsService = secureService("cohorts", insecureCohortService);

export const cohortsSeedingService = createCohortsService(
  db,
  async () => {
    return Promise.resolve({
      id: "",
      name: "",
      clerkId: "",
      email: "",
      role: "",
    });
  },
  (): Promise<
    {
      id: string;
      name: string;
    }[]
  > => {
    return Promise.resolve([]);
  }
);
