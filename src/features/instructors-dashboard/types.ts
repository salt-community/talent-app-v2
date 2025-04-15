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

export type AssignmentInsert = {
  assignment: {
    assignmentId: string;
    identityId: string;
    category: string;
    comment: string | null;
    score: number;
  };
};

export type ScoreStatus = {
  assignmentId: string;
  identityId: string;
  status: string;
};
