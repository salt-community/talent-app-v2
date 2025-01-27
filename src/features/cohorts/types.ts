import { cohortsService } from "./service";

type CohortService = ReturnType<typeof cohortsService>;

export type GetAllCohorts = CohortService["getAll"];
export type GetCohortIdentities = CohortService["getCohortIdentities"];
export type GetCohortById = CohortService["getCohortById"];
export type DeleteCohorts = CohortService["deleteCohort"];
export type UpdateCohortStatus = CohortService["updateCohortStatus"];
export type CreateCohort = CohortService["createCohort"];

export type Cohort = {
  id: string;
  name: string;
  status: "planned" | "ongoing" | "finished";
  description: string;
  createdAt: Date;
};

export type NewCohort = Omit<Cohort, "id" | "createdAt">;

export const CohortStatus = ["planned", "ongoing", "finished"] as const;

export type CohortStatus = (typeof CohortStatus)[number];
