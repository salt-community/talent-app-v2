import {
  assignmentsService,
  cohortsService,
  developerProfilesService,
} from "@/features";
import { createInstructorService } from "./service";

export const instructorService = createInstructorService(
  cohortsService.getAll,
  cohortsService.getCohortById,
  cohortsService.addCohort,
  assignmentsService.getAssignmentsByCohortId,
  assignmentsService.createAssignment,
  cohortsService.getCohortStudents,
  developerProfilesService.getAll,
  cohortsService.addDevelopersToCohort,
  cohortsService.deleteIdentityFromCohort
);
