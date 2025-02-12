import { createAssignmentsService } from "./service";

export type CreateAssignment = AssignmentsService["createAssignment"];

export type Assignment = {
  id: string;
  title: string;
  tags: string[] | null;
  cohortId: string | null;
  comment: string | null;
  categories: string[] | null;
  createdAt: Date | null;
};

export type NewAssignment = Omit<Assignment, "id" | "createdAt">;

export type AssignmentScore = {
  id: string;
  assignmentId: string;
  identityId: string;
  score: string;
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
  score: string;
  comment: string | null;
};

export type NewAssignmentScore = Omit<AssignmentScore, "id" | "createdAt">;

export type AssignmentsService = ReturnType<typeof createAssignmentsService>;
