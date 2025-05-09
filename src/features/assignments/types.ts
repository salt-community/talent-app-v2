import { assignments } from "./schema";
import { createAssignmentsService } from "./service";

export type CreateAssignment = AssignmentsService["createAssignment"];
export type GetAssignmentsByCohortId =
  AssignmentsService["getAssignmentsByCohortId"];
export type DeleteAssignmentById = AssignmentsService["deleteAssignment"];
export type GetAssignmentBySlug = AssignmentsService["getAssignmentBySlug"];
export type UpsertAssignmentScore = AssignmentsService["upsertAssignmentScore"];
export type UpdateScoreStatuses = AssignmentsService["updateScoreStatuses"];
export type GetScoredAssignmentsByCohortIdAndIdentityId =
  AssignmentsService["getScoredAssignmentsByCohortIdAndIdentityId"];
export type GetAverageScoresByIdentityId =
  AssignmentsService["getAverageScoresByIdentityId"];
export type GetScoresWithFeedbackByAssignmentId =
  AssignmentsService["getScoresWithFeedbackByAssignmentId"];
export type GetAssignmentWithCategoriesBySlug =
  AssignmentsService["getAssignmentWithCategoriesBySlug"];
export type GetFixListByAssignmentScoreId =
  AssignmentsService["getFixListByAssignmentScoreId"];

export type AddFixToAssignmentScore =
  AssignmentsService["addFixToAssignmentScore"];

export type AddPrivateNoteToAssignmentScore =
  AssignmentsService["addPrivateNoteToAssignmentScore"];
export type getPrivateNotesByAssignmentScoreId =
  AssignmentsService["getPrivateNotesByAssignmentScoreId"];

export type GetCategoryByAssignmentId =
  AssignmentsService["getCategoryByAssignmentId"];

export type DeleteFixItemById = AssignmentsService["deleteFixItemById"];
export type UpdateFixStatusById = AssignmentsService["updateFixStatusById"];

export type Assignment = typeof assignments.$inferSelect;
export type NewAssignment = typeof assignments.$inferInsert;

export type AssignmentScore = {
  id: string;
  assignmentId: string;
  identityId: string;
  score: number;
  status?: string;
};

export type AssignmentWithCategory = {
  id: string;
  title: string;
  cohortId: string;
  categories: string[];
  slug?: string;
};

export type AssignmentFeedback = {
  id: string;
  assignmentScoreId: string;
  comment?: string;
  score?: number;
  categoryId?: string;
};

export type AssignmentFormData = {
  developerProfileId: string | undefined;
  title: string;
  tags: string[];
  score: string;
  cohortId: string | null;
  comment: string | null;
  categories: string[] | null;
};

export type AssignmentScoreFormData = {
  assignmentId: string;
  identityId: string;
  score: number;
  comment: string | null;
};

export type ScoreStatus = {
  assignmentId: string;
  identityId: string;
  status: string;
};

export type FixItem = {
  id: string;
  assignmentScoreId: string;
  description: string;
  isCompleted: boolean;
  dueDate: Date | null;
  createdAt: Date | null;
  updatedAt: Date | null;
};

export type AssignmentsService = ReturnType<typeof createAssignmentsService>;
