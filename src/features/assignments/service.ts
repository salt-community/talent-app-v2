import { Db } from "@/db";
import { averageScore } from "./logic";
import { createAssignmentsRepository } from "./repository";
import {
  AssignmentScore,
  AssignmentScoreFormData,
  AssignmentWithCategory,
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

    async createAssignment(assignment: AssignmentWithCategory) {
      const slug = generateSlug(assignment.title);
      return await repo.createAssignment({ ...assignment, slug });
    },

    async updateAssignment(assignment: AssignmentWithCategory) {
      const slug = generateSlug(assignment.title);
      return await repo.updateAssignment(assignment.id!, {
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

    async upsertAssignmentScore(args: {
      scoreData: AssignmentScore;
      feedbackDataArray: Array<{
        comment?: string;
        score?: number;
        categoryId?: string;
      }>;
    }) {
      return await repo.upsertAssignmentScore(args);
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

    async getAssignmentWithCategoriesBySlug(slug: string) {
      return await repo.getAssignmentWithCategoriesBySlug(slug);
    },

    async getFixListByAssignmentScoreId(assignmentId: string) {
      return await repo.getFixListByAssignmentScoreId(assignmentId);
    },

    async addFixToAssignmentScore(args: {
      assignmentScoreId: string;
      description: string;
      dueDate?: Date;
    }) {
      return await repo.addFixToAssignmentScore(args);
    },

    async getPrivateNotesByAssignmentScoreId(assignmentId: string) {
      return await repo.getPrivateNotesByAssignmentScoreId(assignmentId);
    },

    async addPrivateNoteToAssignmentScore(args: {
      assignmentScoreId: string;
      note: string;
    }) {
      return await repo.addPrivateNoteToAssignmentScore(args);
    },

    async getScoresWithFeedbackByAssignmentId(assignmentId: string) {
      return await repo.getScoresWithFeedbackByAssignmentId(assignmentId);
    },

    async getAssignmentFeedbackByAssignmentScoreId(assignmentScoreId: string) {
      return await repo.getAssignmentFeedbackByAssignmentScoreId(
        assignmentScoreId
      );
    },

    async getCategoryByAssignmentId(assignmentId: string) {
      return await repo.getCategoryByAssignmentId(assignmentId);
    },

    //this function is used in the seed file
    async attachCategoriesToAssignment(args: {
      assignmentId: string;
      categoryIds: string[];
    }) {
      return await repo.attachCategoriesToAssignment(
        args.assignmentId,
        args.categoryIds
      );
    },

    //this function is used in the seed file
    async getRandomCategoryIds(maxCategories: number) {
      return await repo.getRandomCategoryIds(maxCategories);
    },

    //this function is used in the seed file
    async ensureCategoriesExist(categoryNames: string[]) {
      return await repo.ensureCategoriesExist(categoryNames);
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
