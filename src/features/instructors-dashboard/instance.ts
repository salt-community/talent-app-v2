import { createInstructorService } from "./service";
import { iamService } from "../iam";
import { assignmentsService } from "../assignments";
import { cohortsService } from "../cohorts";

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
  assignmentsService.createAssignmentScore,
  assignmentsService.upsertAssignmentScore,
  assignmentsService.getScoresByAssignmentId,
  iamService.getAllIdentities,
);
