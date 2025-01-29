import { Db } from "@/db";
import { createCohortsRepository } from "./repository";
import { CohortStatus, Cohort } from "./types";

export function createCohortsService(db: Db) {
  const repo = createCohortsRepository(db);

  return {
    async getAll() {
      return await repo.getAllCohorts();
    },

    async createCohort(data: Cohort) {
      return await repo.createCohort(data);
    },

    async getCohortById(cohortId: string) {
      return await repo.getCohortById(cohortId);
    },

    async deleteCohort(cohortId: string) {
      return await repo.deleteCohort(cohortId);
    },

    async updateCohortStatus(args: { cohortId: string; status: CohortStatus }) {
      return await repo.updateCohortStatus(args);
    },
  };
}

export type CohortsService = ReturnType<typeof createCohortsService>;
