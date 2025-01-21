import { createAssignmentsService } from "./service";

export type Assignment = {
  id: number;
  devId: string;
  title: string;
  score: number;
  comment?: string;
  tags?: string[];
};

export type AssignmentFormData = {
  devId: string;
  title: string;
  score: string;
  comment: string;
  tags: string[];
};

export type NewAssignment = Omit<Assignment, "id">;

export type AssignmentsService = ReturnType<typeof createAssignmentsService>;
