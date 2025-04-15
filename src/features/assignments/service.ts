import { Db } from "@/db";
import { averageScore, averageScoresByCategory } from "./logic";
import { createAssignmentsRepository } from "./repository";
import {
  Assignment,
  AssignmentScore,
  AssignmentScoreFormData,
  NewAssignment,
} from "./types";
import { ScoreStatus } from "../instructors-dashboard/types";

export function createAssignmentsService(db: Db) {
  const repo = createAssignmentsRepository(db);

  return {
    async getAllAssignments() {
      return await repo.getAllAssignments();
    },

    async getScoredAssignmentsByCohortIdAndIdentityId(args: {
      cohortId: string;
      identityId: string;
    }) {
      return await repo.getAssignmentsByCohortIdAndIdentityId(
        args.cohortId,
        args.identityId
      );
    },

    async createAssignment(assignment: NewAssignment) {
      const slug = generateSlug(assignment.title);
      return await repo.createAssignment({ ...assignment, slug });
    },

    async updateAssignment(assignment: Assignment) {
      const slug = generateSlug(assignment.title);
      return await repo.updateAssignment(assignment.id, {
        ...assignment,
        slug,
      });
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
    async updateScoreStatuses(scoresStatuses: ScoreStatus[]) {
      await repo.updateScoreStatuses(scoresStatuses);
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
    async getAssignmentBySlug(slug: string) {
      return await repo.getAssignmentsBySlug(slug);
    },
    async addCategory(category: string) {
      //can be removed after merge
      return await repo.addCategory(category);
    },
    async getAllCategories() {
      //can be removed after merge
      return await repo.getAllCategories();
    },
    async getAllAssignmentScores() {
      //can be removed after merge
      return await repo.getAllAssignmentScores();
    },
    async addAssignmentCategory(args: {
      assignmentId: string;
      categoryId: string;
    }) {
      //can be removed after merge
      return await repo.addAssignmentCategory(args);
    },
    async addAssignmentFeedback(args: {
      assignmentScoreId: string;
      categoryId: string;
      comment: string | null;
      score: number | null;
    }) {
      //can be removed after merge
      return await repo.addAssignmentFeedback(args);
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
