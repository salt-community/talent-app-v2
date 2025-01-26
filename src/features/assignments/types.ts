import { createAssignmentsService } from "./service";

export type Assignment = {
  id: number;
  title: string;
  tags: string[];
  cohortId: string;
  comment?: string;
  categories?: string[];
  createdAt: Date;
};

export type AssignmentScore = {
  id: string;
  assignmentId: string;
  identityId: string;
  score: number;
  comment?: string;
  createdAt: Date;
};

export type AssignmentFormData = {
  title: string;
  tags: string[];
  cohortId: string;
  comment?: string;
  categories?: string[];
  description?: string;
};

export type AssignmentScoreFormData = {
  assignmentId: string;
  identityId: string;
  score: number;
  comment?: string;
};

export type NewAssignment = Omit<Assignment, "id" | "createdAt">;
export type NewAssignmentScore = Omit<AssignmentScore, "id" | "createdAt">;

export type AssignmentsService = ReturnType<typeof createAssignmentsService>;
