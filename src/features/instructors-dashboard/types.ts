export type Developer = {
  id: string;
  name: string;
  clerkId: string;
  email: string;
  role: string;
};

export type Cohort = {
  id?: string;
  name: string;
  status: string;
  description: string;
  createdAt: Date | null;
};
export type Assignment = {
  id: string;
  cohortId: string;
  title: string;
  slug: string | null;
  comment: string | null;
  categories: string[] | null;
  createdAt: Date | null;
  updatedAt: Date | null;
};

export type AssignmentScore = {
  id: string | null;
  assignmentId: string;
  identityId: string;
  categoryId: string;
  categoryName: string;
  comment: string | null;
  score: number;
  status?: string;
};

export type ScoreStatus = {
  assignmentId: string;
  identityId: string;
  status: string;
};

export type DeveloperWithScores = {
  developer: Developer;
  scores: AssignmentScore[];
  scored: boolean;
  published: boolean;
};

export type FixLists = {
  id: string;
  assignmentScoreId: string;
  description: string;
  isCompleted: boolean | null;
  dueDate: Date | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  developerId?: string;
};
export type PrivateNote = {
  id: string;
  assignmentScoreId: string;
  note: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
};

export type TabType = "scoring" | "fixList" | "privateNotes";
