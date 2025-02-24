import { assignmentsService, cohortsService, iamService } from "@/features";
import { createInstructorService } from "./service";

export const instructorService = createInstructorService(
  cohortsService.getAll,
  cohortsService.getCohortById,
  cohortsService.addCohort,
  cohortsService.addDevelopersToCohort,
  cohortsService.deleteCohortIdentity,
  cohortsService.deleteCohortAndCohortIdentity,
  cohortsService.getCohortStudents,
  assignmentsService.getAssignmentsByCohortId,
  assignmentsService.createAssignment,
  assignmentsService.deleteAssignment,
  assignmentsService.getAssignmentBySlug,
  iamService.getAllIdentities
);
