import { createInstructorService } from "./service";
import { cohortsService, secureService } from "@/features";

export const insecureInstructorsService = createInstructorService(
  cohortsService.getAll,
  cohortsService.getCohortById,
  cohortsService.createCohort
);
export const instructorService = secureService(
  "instructors",
  insecureInstructorsService
);
