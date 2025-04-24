import { db } from "@/db";
import { iamService, secureService } from "../iam";
import { createCohortsService } from "./service";

const insecureCohortService = createCohortsService(
  db,
  iamService.getIdentityById,
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
 
);
