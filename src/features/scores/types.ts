export type Assignment = {
  id: number;
  userId: number;
  score: number;
  title: string;
  comment: string | null;
  tags: string[];
};

export type AssignmentUpdates = {
  userId: number;
  score?: number;
  title: string;
  comment?: string | null;
  tags?: string[];
};

export type NewAssignment = Omit<Assignment, "id">;
