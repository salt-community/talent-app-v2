import { assignmentsService } from "../assignments";
import { cohortsService } from "../cohorts";
import { iamService } from "../iam";
import { createInstructorService } from "./service";

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
  assignmentsService.upsertAssignmentScore,
  assignmentsService.updateScoreStatuses,
  assignmentsService.getAssignmentWithCategoriesBySlug,
  assignmentsService.getScoresWithFeedbackByAssignmentId,
  assignmentsService.getFixListByAssignmentScoreId,
  assignmentsService.addFixToAssignmentScore,
  assignmentsService.addPrivateNoteToAssignmentScore,
  assignmentsService.getPrivateNotesByAssignmentScoreId,
  assignmentsService.updateFixStatusById,
  assignmentsService.deleteFixItemById,
  iamService.getAllIdentities
);
