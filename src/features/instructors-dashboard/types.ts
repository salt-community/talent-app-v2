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
  assignment: {
    assignmentId: string;
    identityId: string;
    title: string;
    category: string[] | null;
    comment: string[] | null;
    score: number[] | null;
  };
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

