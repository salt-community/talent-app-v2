import { Db } from "@/db";
import { CohortIdentity } from "../cohorts";
import { averageScore, averageScoresByCategory } from "./logic";
import { createAssignmentsRepository } from "./repository";
import { AssignmentScoreFormData, NewAssignment } from "./types";

export function createAssignmentsService(
  db: Db,
  getCohortIdentityByIdentityId: (IdentityId: string) => Promise<CohortIdentity>
) {
  const repo = createAssignmentsRepository(db);

  return {
    async getCohortIdentity(identityId: string) {
      return await getCohortIdentityByIdentityId(identityId);
    },
    async getAllAssignments() {
      return await repo.getAllAssignments();
    },

    async createAssignment(data: NewAssignment) {
      return await repo.createAssignment(data);
    },

    async getAssignmentById(assignmentId: string) {
      return await repo.getAssignmentById(assignmentId);
    },

    async getAssignmentsByCohortId(cohortId: string) {
      return await repo.getAssignmentsByCohortId(cohortId);
    },

    async createAssignmentScore(data: AssignmentScoreFormData) {
      return await repo.createAssignmentScore(data);
    },

    async getScoresByAssignmentId(assignmentId: string) {
      return await repo.getScoresByAssignmentId(assignmentId);
    },

    async getAverageScoresByIdentityId(identityId: string) {
      const assignmentScores = await repo.getScoresByIdentityId(identityId);
      const validScores = assignmentScores
        .map((assignmentScore) => assignmentScore.score)
        .filter((score): score is number => score !== null || score !== 0);

      return averageScore(validScores);
    },
    async getAllAverageScoresByIdentityId(identityId: string) {
      const assignmentScores = await repo.getScoresByIdentityId(identityId);
      const validScores = assignmentScores.filter(
        (assignment) => assignment.score !== null
      );
      return averageScoresByCategory(validScores);
    },

    async deleteAllAssignments() {
      return await repo.deleteAllAssignments();
    },

    async deleteAssignment(assignmentId: string) {
      return await repo.deleteAssignment(assignmentId);
    },
    async deleteAssignmentScoreById(identityId: string) {
      await repo.deleteAssignmentScoreById(identityId);
    },

    async getAssignmentsByCohort(cohortId: string) {
      return await repo.getAssignmentsByCohort(cohortId);
    },

    async updateAssignment({
      id,
      rawData,
    }: {
      id: string;
      rawData: Partial<NewAssignment>;
    }) {
      return await repo.updateAssignment(id, rawData);
    },
  };
}

export type AssignmentsService = ReturnType<typeof createAssignmentsService>;
