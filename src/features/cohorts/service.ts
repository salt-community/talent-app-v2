import { Db } from "@/db";
import { createCohortsRepository } from "./repository";
import { CohortFormData, Identity, UnassignedDevelopers } from "./types";

export function createCohortsService(
  db: Db,
  getIdentityById: (id: string) => Promise<Identity>,
  getAllUnassignedDevelopers: () => Promise<UnassignedDevelopers[]>
) {
  const repository = createCohortsRepository(db);

  return {
    async getAll() {
      return await repository.getAllCohorts();
    },

    async addCohort(data: CohortFormData) {
      return await repository.createCohort(data);
    },

    async deleteIdentityFromCohort(identityId: string) {
      return await repository.deleteIdentityFromCohort(identityId);
    },

    async deleteCohortAndCohortIdentity(cohortId: string) {
      await repository.deleteCohortAndCohortIdentity(cohortId);
    },

    async getCohortStudents(cohortId: string) {
      const cohortStudents = await repository.getCohortStudents(cohortId);
      const students = await Promise.all(
        cohortStudents.map((student) => getIdentityById(student.identityId))
      );
      return students;
    },

    async addDevelopersToCohort(args: {
      cohortId: string;
      identityIds: string[];
    }) {
      await repository.addDevelopersToCohort(args);
    },
  };
}

export type CohortsService = ReturnType<typeof createCohortsService>;
