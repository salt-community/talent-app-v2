import { Db } from "@/db";
import { createAssignmentsRepository } from "./repository";
import { NewAssignment, NewAssignmentScore } from "./types";

export function createAssignmentsService(db: Db) {
  const repo = createAssignmentsRepository(db);

  return {
    async createAssignment(data: FormData) {
      return await repo.createAssignment(data);
    },

    async getAssignmentById(assignmentId: string) {
      return await repo.getAssignmentById(assignmentId);
    },

    async getAssignmentsByCohortId(cohortId: string) {
      return await repo.getAssignmentsByCohortId(cohortId);
    },

    async createAssignmentScore(assignmentId: string, data: FormData) {
      return await repo.createAssignmentScore(assignmentId, data);
    },

    async getScoresByAssignmentId(assignmentId: string) {
      return await repo.getScoresByAssignmentId(assignmentId);
    },

    async getScoresByIdentityId(identityId: string) {
      return await repo.getScoresByIdentityId(identityId);
    },

    async deleteAllAssignments() {
      return await repo.deleteAllAssignments();
    },

    async deleteAssignment(assignmentId: string) {
      return await repo.deleteAssignment(assignmentId);
    },

    async getAssignmentsByCohort(cohortId: string) {
      return await repo.getAssignmentsByCohort(cohortId);
    },

    async updateAssignment({ id, rawData }: { id: string; rawData: FormData }) {
      return await repo.updateAssignment(id, rawData);
    },
  };
}

export type AssignmentsService = ReturnType<typeof createAssignmentsService>;
