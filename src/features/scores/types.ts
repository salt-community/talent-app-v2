export type Assignment = {
  id: number;
  devId: string;
  score: number;
  title: string;
  comment: string | null;
  tags: string[];
};

export type AssignmentUpdates = {
  devId: string;
  score?: number;
  title: string;
  comment?: string | null;
  tags?: string[];
};

export type NewAssignment = Omit<Assignment, "id">;
