import { createAssignmentsService } from "./service";

export type Assignment = {
  id: string;
  title: string;
  score: number; // add the 'score' property
  tags: string[];
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
  title: string;
  tags: string[];
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
