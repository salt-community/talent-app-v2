import { Db } from "@/db";
import { createCohortsRepository } from "./repository";
import { CohortStatus, CohortFormData } from "./types";

type Identity = {
  cohortId: string | null;
  id: string;
  name: string;
  clerkId: string;
  email: string;
  role: "admin" | "core" | "developer";
};
type UnassignedDevelopers = {
  id: string;
  name: string;
};

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

    async createCohort(data: CohortFormData) {
      return await repository.createCohort(data);
    },

    async getCohortById(cohortId: string) {
      return await repository.getCohortById(cohortId);
    },

    async deleteCohort(cohortId: string) {
      return await repository.deleteCohort(cohortId);
    },

    async updateCohortStatus(args: { cohortId: string; status: CohortStatus }) {
      return await repository.updateCohortStatus(args);
    },
    async getCohortStudents(cohortId: string) {
      const cohortStudents = await repository.getCohortStudents(cohortId);
      const students = await Promise.all(
        cohortStudents.map((student) => getIdentityById(student.identityId))
      );
      return students;
    },
    async getAllUnassignedDevelopers() {
      return await getAllUnassignedDevelopers();
    },
  };
}

export type CohortsService = ReturnType<typeof createCohortsService>;
