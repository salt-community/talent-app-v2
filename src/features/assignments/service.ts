import { Db } from "@/db";
import { ScoreStatus } from "../instructors-dashboard/types";
import { averageScore } from "./logic";
import { createAssignmentsRepository } from "./repository";
import {
  AssignmentScore,
  AssignmentWithCategory
} from "./types";

export function createAssignmentsService(db: Db) {
  const repo = createAssignmentsRepository(db);

  return {

    async getScoredAssignmentsByCohortIdAndIdentityId(identityId: string) {
      return await repo.getAssignmentsByCohortIdAndIdentityId(identityId);
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

    async getAssignmentsByCohortId(cohortId: string) {
      return await repo.getAssignmentsByCohortId(cohortId);
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

    async getAverageScoresByIdentityId(identityId: string) {
      const assignmentScores = await repo.getScoresByIdentityId(identityId);

      const scoresByAssignment = new Map();

      assignmentScores.forEach((item) => {
        if (item.assignmentId && item.score !== null && item.score !== 0) {
          if (!scoresByAssignment.has(item.assignmentId)) {
            scoresByAssignment.set(item.assignmentId, []);
          }
          scoresByAssignment.get(item.assignmentId).push(item.score);
        }
      });

      const averageScores = Array.from(scoresByAssignment.entries()).map(
        ([assignmentId, scores]) => ({
          assignmentId,
          averageScore: averageScore(scores),
        })
      );
      return averageScores;
    },

    async deleteAssignment(assignmentId: string) {
      return await repo.deleteAssignment(assignmentId);
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
      dueDate?: Date | null;
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

    async deleteFixItemById(id: string) {
      return await repo.deleteFixItemById(id);
    },

    async updateFixStatusById(args: { id: string; newStatus: boolean }) {
      return await repo.updateFixStatusById(args);
    },

    async attachCategoriesToAssignment(args: {
      assignmentId: string;
      categoryIds: string[];
    }) {
      return await repo.attachCategoriesToAssignment(
        args.assignmentId,
        args.categoryIds
      );
    },

    async getRandomCategoryIds(maxCategories: number) {
      return await repo.getRandomCategoryIds(maxCategories);
    },

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
