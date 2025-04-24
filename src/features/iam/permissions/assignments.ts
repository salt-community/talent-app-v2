import { AssignmentsService } from "@/features/assignments";
import { PermissionsSchema } from "../secure-service";
import { PagePermissionsSchema } from "./types";

export const assignments: PermissionsSchema<"assignments", AssignmentsService> =
  {
    createAssignment: "assignments.createAssignment",
    deleteAssignment: "assignments.deleteAssignment",
    getAssignmentsByCohortId: "assignments.getAssignmentsByCohortId",
    getAverageScoresByIdentityId: "assignments.getAverageScoresByIdentityId",
    updateAssignment: "assignments.updateAssignment",
    getAssignmentBySlug: "assignments.getAssignmentBySlug",
    upsertAssignmentScore: "assignments.upsertAssignmentScore",
    updateScoreStatuses: "assignments.updateScoreStatuses",
    getScoredAssignmentsByCohortIdAndIdentityId:
      "assignments.getScoredAssignmentsByCohortIdAndIdentityId",
    attachCategoriesToAssignment: "assignments.attachCategoriesToAssignment",
    getRandomCategoryIds: "assignments.getRandomCategoryIds",
    ensureCategoriesExist: "assignments.ensureCategoriesExist",
    getAssignmentWithCategoriesBySlug:
      "assignments.getAssignmentWithCategoriesBySlug",
    getScoresWithFeedbackByAssignmentId:
      "assignments.getScoresWithFeedbackByAssignmentId",
    getFixListByAssignmentScoreId: "assignments.getFixListByAssignmentScoreId",
    addFixToAssignmentScore: "assignments.addFixToAssignmentScore",
    getPrivateNotesByAssignmentScoreId:
      "assignments.getPrivateNotesByAssignmentScoreId",
    addPrivateNoteToAssignmentScore:
      "assignments.addPrivateNoteToAssignmentScore",
    getAssignmentFeedbackByAssignmentScoreId:
      "assignments.getAssignmentFeedbackByAssignmentScoreId",
    getCategoryByAssignmentId: "assignments.getCategoryByAssignmentId",
    deleteFixItemById: "assignments.deleteFixItemById",
    updateFixStatusById: "assignments.updateFixStatusById",
  };

type AssignmentViewPermission = "score";

type AssignmentViewPermissions = Record<AssignmentViewPermission, string>;

export const assignmentPermissions: PagePermissionsSchema<
  "assignment",
  AssignmentViewPermissions
> = {
  score: "assignment.score",
};
