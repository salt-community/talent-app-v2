import { secureService } from "@/features";
import { createCohortsService } from "./service";
import { db } from "@/db";

const insecureCohortService = createCohortsService(db);

export const createCohortsService = secureService(
  "cohorts",
  insecureCohortService
);
