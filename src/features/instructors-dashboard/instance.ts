import { createInstructorService } from "./service";
import { iamService } from "../iam";
import { assignmentsService } from "../assignments";
import { cohortsService } from "../cohorts";

export const instructorService = createInstructorService(
  cohortsService.getAll,
  cohortsService.addCohort,
  cohortsService.addDevelopersToCohort,
  cohortsService.deleteIdentityFromCohort,
  cohortsService.deleteCohortAndCohortIdentity,
  cohortsService.getCohortStudents,
  assignmentsService.getAssignmentsByCohortId,
  assignmentsService.createAssignment,
  assignmentsService.updateAssignment,
  assignmentsService.deleteAssignment,
  assignmentsService.getAssignmentBySlug,
  assignmentsService.upsertAssignmentScore,
  assignmentsService.getScoresByAssignmentId,
  assignmentsService.updateScoreStatuses,
  assignmentsService.getAssignmentWithCategoriesBySlug,
  assignmentsService.getScoresWithFeedbackByAssignmentId,
  assignmentsService.getFixListByAssignmentScoreId,
  assignmentsService.addFixToAssignmentScore,
  assignmentsService.addPrivateNoteToAssignmentScore,
  assignmentsService.getPrivateNotesByAssignmentScoreId,
  iamService.getAllIdentities
);
