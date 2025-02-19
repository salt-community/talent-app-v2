import { assignmentsService, cohortsService } from "@/features";
import { createInstructorService } from "./service";

export const instructorService = createInstructorService(
  cohortsService.getAll,
  cohortsService.getCohortById,
  cohortsService.addCohort,
  assignmentsService.getAssignmentsByCohortId
);
