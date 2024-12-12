export type Scores = {
  id: number;
  frontend: number;
  backend: number;
  individualCommunication: number;
  teamCollaboration: number;
  design: number;
  management: number;
};

export type CompleteScores = Scores & {
  programmingScore: number;
  planningScore: number;
  communicationScore: number;
  averageScore: number;
};

export type Assignment = {
  id: number;
  userId: number;
  score: number;
  title: string;
  comment: string | null;
  tags: string[];
};

export type NewAssignment = Omit<Assignment, "id">;
export type NewScores = Omit<Scores, "id">;
