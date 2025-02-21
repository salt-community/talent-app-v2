import { createCohortsService } from "./service";

export type CohortsService = ReturnType<typeof createCohortsService>;

export type GetAllCohorts = CohortsService["getAll"];
export type GetCohortById = CohortsService["getCohortById"];
export type DeleteIdentityFromCohort =
  CohortsService["deleteIdentityFromCohort"];
export type UpdateCohortStatus = CohortsService["updateCohortStatus"];
export type AddCohort = CohortsService["addCohort"];
export type GetCohortStudents = CohortsService["getCohortStudents"];
export type AddDevelopersToCohort = CohortsService["addDevelopersToCohort"];

export type Cohort = {
  id?: string;
  name: string;
  status: string;
  description: string;
  createdAt: Date | null;
};

export type CohortIdentity = {
  cohortId: string;
  identityId: string;
};
export type CohortFormData = {
  name: string;
  status: string;
  description?: string;
  identityId?: string;
};
export type Identity = {
  id: string;
  name: string;
  clerkId: string;
  email: string;
  role: string;
};
export type UnassignedDevelopers = {
  id: string;
  name: string;
};
