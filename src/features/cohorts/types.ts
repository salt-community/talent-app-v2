import { createCohortsService } from "./service";

type CohortService = ReturnType<typeof createCohortsService>;

export type GetAllCohorts = CohortService["getAll"];
export type GetCohortIdentities = CohortService["getCohortIdentities"];
export type GetCohortById = CohortService["getCohortById"];
export type DeleteCohorts = CohortService["delete"];
export type UpdateStatus = CohortService["updateStatus"];
export type CreateCohort = CohortService["createCohort"];

export type Cohort = {
  name: string;
  id: string;
  status: "planned" | "ongoing" | "finished";
};

export const CohortStatus = ["planned", "ongoing", "finished"] as const;

export type CohortStatus = (typeof CohortStatus)[number];
