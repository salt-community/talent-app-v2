import { createCohortsService } from "./service";

export type CohortsService = ReturnType<typeof createCohortsService>;

export type GetAllCohorts = CohortsService["getAll"];
export type GetCohortById = CohortsService["getCohortById"];
export type DeleteCohort = CohortsService["deleteCohort"];
export type UpdateCohortStatus = CohortsService["updateCohortStatus"];
export type CreateCohort = CohortsService["createCohort"];

export const CohortStatus = ["planned", "ongoing", "finished"] as const;
export type CohortStatus = (typeof CohortStatus)[number];

export type Cohort = {
  id?: string;
  name: string;
  status: CohortStatus;
  description: string;
  createdAt: Date | null;
};

export type CohortFormData = {
  name: string;
  status: CohortStatus;
  description?: string;
  identityId?: string;
};
export type Identity = {
  cohortId: string | null;
  id: string;
  name: string;
  clerkId: string;
  email: string;
  role: "admin" | "core" | "developer";
};
export type UnassignedDevelopers = {
  id: string;
  name: string;
};
