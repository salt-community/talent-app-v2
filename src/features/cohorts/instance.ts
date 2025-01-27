import { secureService } from "@/features";
import { cohortsService } from "./service";
import { db } from "@/db";

const insecureCohortService = cohortsService(db);

export const createCohortsService = secureService(
  "cohorts",
  insecureCohortService
);
