import { Db } from "@/db";
import { and, eq } from "drizzle-orm";
import {
  assignmentCategories,
  assignmentFeedback,
  assignmentPrivateNotes,
  assignments,
  assignmentScores,
  categories,
  fixList,
} from "./schema";
import {
  AssignmentScore,
  AssignmentScoreFormData,
  FixItem,
  NewAssignment,
} from "./types";
import { ScoreStatus } from "../instructors-dashboard/types";

export function createAssignmentsRepository(db: Db) {
  return {
    async createAssignment(assignment: NewAssignment) {
      const [insertedAssignment] = await db
        .insert(assignments)
        .values(assignment)
        .returning();
      return insertedAssignment;
    },

    async getAllAssignments() {
      return await db.select().from(assignments);
    },

    async getAssignmentsByCohortIdAndIdentityId(
      cohortId: string,
      identityId: string
    ) {
      const assignmentsWithScores = await db
        .select()
        .from(assignments)
        .leftJoin(
          assignmentScores,
          and(
            eq(assignments.id, assignmentScores.assignmentId),
            eq(assignmentScores.identityId, identityId)
          )
        )
        .leftJoin(
          assignmentFeedback,
          eq(assignmentFeedback.assignmentScoreId, assignmentScores.id)
        )
        .leftJoin(categories, eq(assignmentFeedback.categoryId, categories.id))
        .where(
          and(
            eq(assignments.cohortId, cohortId),
            eq(assignmentScores.status, "published")
          )
        );

      const enhancedAssignments = await Promise.all(
        assignmentsWithScores.map(async (assignment) => {
          let fixItemsArray: {
            id: string;
            assignmentScoreId: string;
            description: string;
            isCompleted: boolean | null;
            dueDate: Date | null;
            createdAt: Date | null;
            updatedAt: Date | null;
          }[] = [];

          if (assignment.assignment_scores?.id) {
            const dbFixItems = await db
              .select()
              .from(fixList)
              .where(
                eq(fixList.assignmentScoreId, assignment.assignment_scores.id)
              );

            fixItemsArray = dbFixItems.map((item) => ({
              id: item.id,
              assignmentScoreId: item.assignmentScoreId,
              description: item.description,
              isCompleted: item.isCompleted,
              dueDate: item.dueDate,
              createdAt: item.createdAt,
              updatedAt: item.updatedAt,
            }));
          }

          return {
            ...assignment,
            assignment_fix_items: fixItemsArray as FixItem[],
          };
        })
      );

      return enhancedAssignments;
    },

    async getAssignmentById(id: string) {
      const [assignment] = await db
        .select()
        .from(assignments)
        .where(eq(assignments.id, id));
      return assignment;
    },

    async getAssignmentsByCohortId(cohortId: string) {
      return await db
        .select()
        .from(assignments)
        .where(eq(assignments.cohortId, cohortId));
    },

    async createAssignmentScore(data: AssignmentScoreFormData) {
      await db.insert(assignmentScores).values(data);
    },

    async getScoresByIdentityId(identityId: string) {
      return await db
        .select({
          scoreId: assignmentScores.id,
          assignmentId: assignmentScores.assignmentId,
          status: assignmentScores.status,
          comment: assignmentFeedback.comment,
          categoryId: assignmentFeedback.categoryId,
          categoryName: categories.name,
          score: assignmentFeedback.score,
        })
        .from(assignmentScores)
        .leftJoin(
          assignmentFeedback,
          eq(assignmentFeedback.assignmentScoreId, assignmentScores.id)
        )
        .leftJoin(categories, eq(assignmentFeedback.categoryId, categories.id))
        .where(eq(assignmentScores.identityId, identityId));
    },

    async updateScoreStatuses(scoreStatuses: ScoreStatus[]) {
      await db.transaction(async (tx) => {
        await Promise.all(
          scoreStatuses.map(async ({ assignmentId, identityId, status }) => {
            await tx
              .update(assignmentScores)
              .set({ status: status })
              .where(
                and(
                  eq(assignmentScores.assignmentId, assignmentId),
                  eq(assignmentScores.identityId, identityId)
                )
              );
          })
        );
      });
    },

    async getScoresByAssignmentId(assignmentId: string) {
      return await db
        .select()
        .from(assignmentScores)
        .where(eq(assignmentScores.assignmentId, assignmentId));
    },

    async upsertAssignmentScore(args: {
      scoreData: AssignmentScore;
      feedbackData?: { comment?: string; score: number; categoryId?: string };
    }) {
      return await db.transaction(async (tx) => {
        const [insertedScore] = await tx
          .insert(assignmentScores)
          .values({
            assignmentId: args.scoreData.assignmentId,
            identityId: args.scoreData.identityId,
            status: args.scoreData.status || "unpublished",
            updatedAt: new Date(),
          })
          .onConflictDoUpdate({
            target: [
              assignmentScores.assignmentId,
              assignmentScores.identityId,
            ],
            set: {
              status: args.scoreData.status || "unpublished",
              updatedAt: new Date(),
            },
          })
          .returning();

        const feedback = args.feedbackData;

        if (
          feedback &&
          (feedback.comment !== undefined || feedback.categoryId !== undefined)
        ) {
          const whereClauses = [
            eq(assignmentFeedback.assignmentScoreId, insertedScore.id),
          ];

          if (feedback.categoryId !== undefined) {
            whereClauses.push(
              eq(assignmentFeedback.categoryId, feedback.categoryId)
            );
          }

          const existingFeedback = await tx
            .select({ id: assignmentFeedback.id })
            .from(assignmentFeedback)
            .where(and(...whereClauses))
            .limit(1);

          if (existingFeedback.length > 0) {
            await tx
              .update(assignmentFeedback)
              .set({
                comment: feedback.comment,
                score: feedback.score,
                updatedAt: new Date(),
              })
              .where(eq(assignmentFeedback.id, existingFeedback[0].id));
          } else {
            await tx.insert(assignmentFeedback).values({
              assignmentScoreId: insertedScore.id,
              comment: feedback.comment || "",
              score: feedback.score,
              categoryId: feedback.categoryId,
              updatedAt: new Date(),
            });
          }
        }

        return insertedScore;
      });
    },

    async deleteAllAssignments() {
      await db.delete(assignments);
    },

    async deleteAssignment(assignmentId: string) {
      return await db
        .delete(assignments)
        .where(eq(assignments.id, assignmentId))
        .returning();
    },
    async deleteAssignmentScoreById(identityId: string) {
      await db
        .delete(assignmentScores)
        .where(eq(assignmentScores.identityId, identityId));
    },

    async updateAssignment(id: string, data: Partial<NewAssignment>) {
      const [updatedAssignment] = await db
        .update(assignments)
        .set(data)
        .where(eq(assignments.id, id))
        .returning();
      return updatedAssignment;
    },

    async getAssignmentsByCohort(cohortId: string) {
      return await db
        .select()
        .from(assignments)
        .where(eq(assignments.cohortId, cohortId));
    },
    async getAssignmentsBySlug(slug: string) {
      const [result] = await db
        .select()
        .from(assignments)
        .where(eq(assignments.slug, slug));

      return result;
    },
    async getAssignmentWithCategoriesBySlug(slug: string) {
      const result = await db
        .select({
          id: assignments.id,
          cohortId: assignments.cohortId,
          title: assignments.title,
          slug: assignments.slug,
          description: assignments.description,
          createdAt: assignments.createdAt,
        })
        .from(assignments)
        .where(eq(assignments.slug, slug))
        .limit(1);

      if (result.length === 0) {
        return null;
      }

      const assignment = result[0];

      const categoryResults = await db
        .select({
          id: categories.id,
          name: categories.name,
          description: categories.description,
        })
        .from(assignmentCategories)
        .innerJoin(
          categories,
          eq(assignmentCategories.categoryId, categories.id)
        )
        .where(eq(assignmentCategories.assignmentId, assignment.id));

      return {
        ...assignment,
        categories: categoryResults,
      };
    },

    async getScoresWithFeedbackByAssignmentId(assignmentId: string) {
      return await db
        .select({
          id: assignmentScores.id,
          assignmentId: assignmentScores.assignmentId,
          identityId: assignmentScores.identityId,
          status: assignmentScores.status,
          createdAt: assignmentScores.createdAt,
          categoryId: assignmentFeedback.categoryId,
          categories: categories.name,
          comment: assignmentFeedback.comment,
          score: assignmentFeedback.score,
        })
        .from(assignmentScores)
        .leftJoin(
          assignmentFeedback,
          eq(assignmentFeedback.assignmentScoreId, assignmentScores.id)
        )
        .leftJoin(categories, eq(assignmentFeedback.categoryId, categories.id))
        .where(eq(assignmentScores.assignmentId, assignmentId));
    },

    async getAssignmentFeedbackByAssignmentScoreId(assignmentScoreId: string) {
      return await db
        .select()
        .from(assignmentFeedback)
        .where(eq(assignmentFeedback.assignmentScoreId, assignmentScoreId));
    },

    async getCategoryByAssignmentId(assignmentId: string) {
      return await db
        .select()
        .from(assignmentCategories)
        .leftJoin(
          categories,
          eq(assignmentCategories.categoryId, categories.id)
        )
        .where(eq(assignmentCategories.assignmentId, assignmentId));
    },

    async getFixListByAssignmentScoreId(assignmentScoreId: string) {
      return await db
        .select()
        .from(fixList)
        .where(eq(fixList.assignmentScoreId, assignmentScoreId));
    },

    async addFixToAssignmentScore(args: {
      assignmentScoreId: string;
      description: string;
      dueDate?: Date;
    }) {
      await db.insert(fixList).values({
        assignmentScoreId: args.assignmentScoreId,
        description: args.description,
        dueDate: args.dueDate,
      });
    },

    async getPrivateNotesByAssignmentScoreId(assignmentScoreId: string) {
      return await db
        .select()
        .from(assignmentPrivateNotes)
        .where(eq(assignmentPrivateNotes.assignmentScoreId, assignmentScoreId));
    },

    async addPrivateNoteToAssignmentScore(args: {
      assignmentScoreId: string;
      note: string;
    }) {
      await db.insert(assignmentPrivateNotes).values({
        assignmentScoreId: args.assignmentScoreId,
        note: args.note,
      });
    },

    async attachCategoriesToAssignment(
      assignmentId: string,
      categoryIds: string[]
    ): Promise<void> {
      for (const categoryId of categoryIds) {
        await db.insert(assignmentCategories).values({
          assignmentId: assignmentId,
          categoryId: categoryId,
        });
      }
    },

    async getRandomCategoryIds(maxCategories: number): Promise<string[]> {
      const allCategories = await db
        .select({ id: categories.id })
        .from(categories);

      const shuffled = [...allCategories].sort(() => 0.5 - Math.random());

      const numCategories = Math.floor(Math.random() * maxCategories) + 1;

      return shuffled.slice(0, numCategories).map((cat) => cat.id);
    },
    async ensureCategoriesExist(categoryNames: string[]): Promise<void> {
      for (const categoryName of categoryNames) {
        const existingCategory = await db
          .select({ id: categories.id })
          .from(categories)
          .where(eq(categories.name, categoryName))
          .limit(1);

        if (existingCategory.length === 0) {
          await db.insert(categories).values({
            name: categoryName,
            description: `Category for ${categoryName} related assignments`,
          });
        }
      }
    },
  };
}
