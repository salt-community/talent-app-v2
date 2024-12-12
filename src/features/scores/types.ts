export type Assignment = {
  id: number;
  userId: number;
  score: number;
  title: string;
  comment: string | null;
  tags: string[];
};

export type AssignmentUpdates = {
  score?: number;
  title?: string;
  comment?: string | null;
  tags?: string[];
};

export type NewAssignment = Omit<Assignment, "id">;
