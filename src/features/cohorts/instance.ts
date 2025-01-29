import { db } from "@/db";
import { createCohortsService } from "./service";
import { secureService } from "@/features";

const insecureCohortService = createCohortsService(db);

export const cohortsService = secureService("cohorts", insecureCohortService);
