import { createAssignmentsService } from "./service";

export type CreateAssignment = AssignmentsService["createAssignment"];
export type GetAllAssignments = AssignmentsService["getAllAssignments"];
export type GetAssignmentsByCohortId =
  AssignmentsService["getAssignmentsByCohortId"];
export type deleteAssignmentScoreById =
  AssignmentsService["deleteAssignmentScoreById"];
export type DeleteAssignmentById = AssignmentsService["deleteAssignment"];
export type GetAssignmentBySlug = AssignmentsService["getAssignmentBySlug"];
export type CreateAssignmentScore = AssignmentsService["createAssignmentScore"];
export type GetScoresByAssignmentId =
  AssignmentsService["getScoresByAssignmentId"];

export type Assignment = {
  id: string;
  title: string;
  cohortId: string | null;
  comment: string | null;
  categories: string[] | null;
  createdAt: Date | null;
  slug: string;
};

export type NewAssignment = Omit<Assignment, "id" | "createdAt">;

export type AssignmentScore = {
  id: string;
  assignmentId: string | null;
  identityId: string | null;
  score: number | null;
  comment: string | null;
  createdAt: Date | null;
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

export type CategoryScore = {
  score: number | null;
  category: string | null;
};

export type CategoryAverage = {
  category: string;
  score: number;
};

export type NewAssignmentScore = Omit<AssignmentScore, "id" | "createdAt">;

export type AssignmentsService = ReturnType<typeof createAssignmentsService>;
