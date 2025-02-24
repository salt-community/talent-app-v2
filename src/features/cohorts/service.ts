import { Db } from "@/db";
import { GetDeveloperProfileByIdentityId } from "@/features";
import { createCohortsRepository } from "./repository";
import { CohortFormData, Identity, UnassignedDevelopers } from "./types";

export function createCohortsService(
  db: Db,
  getIdentityById: (id: string) => Promise<Identity>,
  getAllUnassignedDevelopers: () => Promise<UnassignedDevelopers[]>,
  getAllDeveloperProfilesById: GetDeveloperProfileByIdentityId
) {
  const repository = createCohortsRepository(db);

  return {
    async getAll() {
      return await repository.getAllCohorts();
    },

    async addCohort(data: CohortFormData) {
      return await repository.createCohort(data);
    },

    async getCohortById(cohortId: string) {
      return await repository.getCohortById(cohortId);
    },
    async getCohortIdByIdentityId(identityId: string) {
      return await repository.getCohortIdByIdentityId(identityId);
    },

    async deleteIdentityFromCohort(cohortId: string) {
      return await repository.deleteIdentityFromCohort(cohortId);
    },
    async deleteCohortIdentity(identityId: string) {
      await repository.deleteCohort(identityId);
    },
    async deleteCohortAndCohortIdentity(cohortId: string) {
      await repository.deleteCohortAndCohortIdentity(cohortId);
    },

    async updateCohortStatus(args: { cohortId: string; status: string }) {
      return await repository.updateCohortStatus(args);
    },

    async getCohortStudents(cohortId: string) {
      const cohortStudents = await repository.getCohortStudents(cohortId);
      const students = await Promise.all(
        cohortStudents.map((student) => getIdentityById(student.identityId))
      );
      const validStudents = students.filter((student) => student !== undefined);
      const developerProfiles = await Promise.all(
        validStudents.map((developer) =>
          getAllDeveloperProfilesById(developer.id)
        )
      );
      return developerProfiles.flat();
    },

    async getAllUnassignedDevelopers() {
      return await getAllUnassignedDevelopers();
    },
    async addDeveloperToCohort(args: { cohortId: string; identityId: string }) {
      await repository.addDeveloperToCohort(args);
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
