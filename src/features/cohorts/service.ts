import { Db } from "@/db";
import { createCohortsRepository } from "./repository";
import { CohortStatus } from "./types";

export function createCohortsService(db: Db) {
  const repo = createCohortsRepository(db);

  return {
    async createCohort(name: string, description?: string) {
      return await repo.createCohort({ name, description });
    },
    async getCohortById(cohortId: string) {
      return await repo.getCohortById(cohortId);
    },
    async getAll() {
      return await repo.getAllCohorts();
    },
    async getCohortIdentities(cohortId: string) {
      return await repo.getCohortIdentities(cohortId);
    },
    async deleteCohort(cohortId: string) {
      return await repo.deleteCohort(cohortId);
    },
    async updateCohortStatus(args: { cohortId: string; status: CohortStatus }) {
      return await repo.updateCohortStatus({
        cohortId: args.cohortId,
        status: args.status,
      });
    },
  };
}

export type CohortsService = ReturnType<typeof createCohortsService>;
