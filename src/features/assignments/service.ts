import { Db } from "@/db";
import { averageScore, averageScoresByCategory } from "./logic";
import { createAssignmentsRepository } from "./repository";
import { AssignmentScore, AssignmentScoreFormData, NewAssignment } from "./types";

export function createAssignmentsService(db: Db) {
  const repo = createAssignmentsRepository(db);

  return {
    async getAllAssignments() {
      return await repo.getAllAssignments();
    },

    async createAssignment(data: NewAssignment) {
      const slug = generateSlug(data.title);
      return await repo.createAssignment({ ...data, slug });
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

    async upsertAssignmentScore(score: AssignmentScore) {
      return await repo.upsertAssignmentScore(score);
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
        (assignment) => assignment.score !== null,
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
    async getAssignmentBySlug(slug: string) {
      return await repo.getAssignmentsBySlug(slug);
    },
  };
}
function generateSlug(title: string) {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[åä]/g, "a")
    .replace(/ö/g, "o")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/-+/g, "-")
    .trim();
}
export type AssignmentsService = ReturnType<typeof createAssignmentsService>;
