import { createAssignmentsService } from "./service";

export type Assignment = {
  id: string;
  title: string;
  tags: string[];
  cohortId: string | null;
  comment: string | null;
  categories: string[] | null;
  createdAt: Date | null;
};

export type AssignmentScore = {
  id: string;
  assignmentId: string;
  identityId: string;
  score: string;
  comment: string | null;
  createdAt: Date | null;
};

export type AssignmentFormData = {
  title: string;
  tags: string[];
  cohortId: string | null;
  comment?: string;
  categories?: string[];
};

export type AssignmentScoreFormData = {
  assignmentId: string;
  identityId: string;
  score: string;
  comment?: string;
};

export type NewAssignment = Omit<Assignment, "id" | "createdAt">;

export type NewAssignmentScore = Omit<AssignmentScore, "id" | "createdAt">;

export type AssignmentsService = ReturnType<typeof createAssignmentsService>;
