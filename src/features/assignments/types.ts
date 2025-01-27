import { createAssignmentsService } from "./service";

export type Assignment = {
  id: string;
  title: string;
  tags: string[];
  cohortId?: string;
  comment?: string;
  categories?: string[];
  createdAt: Date;
};

export type AssignmentScore = {
  id: string;
  assignmentId: string;
  identityId: string;
  score: string;
  comment?: string;
  createdAt: Date;
};

export type AssignmentFormData = {
  title: string;
  tags: string[];
  cohortId?: string;
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
