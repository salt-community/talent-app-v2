import { Db } from "@/db";
import { and, eq, inArray } from "drizzle-orm";
import { ScoreStatus } from "../instructors-dashboard/types";
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
  AssignmentFeedback,
  AssignmentScore,
  AssignmentScoreFormData,
  AssignmentWithCategory,
  FixItem,
  NewAssignment,
} from "./types";
import { cohortIdentities } from "../cohorts";

export function createAssignmentsRepository(db: Db) {
  return {
    async createAssignment(assignment: AssignmentWithCategory) {
      return await db.transaction(async (tx) => {
        const { categories: categoryNames, ...assignmentData } = assignment;

        const [insertedAssignment] = await tx
          .insert(assignments)
          .values(assignmentData)
          .returning();

        if (categoryNames && categoryNames.length > 0) {
          const categoryIds = await Promise.all(
            categoryNames.map(async (name: string) => {
              const existingCategory = await tx
                .select()
                .from(categories)
                .where(eq(categories.name, name))
                .limit(1);

              if (existingCategory.length > 0) {
                return existingCategory[0].id;
              }

              const [newCategory] = await tx
                .insert(categories)
                .values({ name })
                .returning();

              return newCategory.id;
            })
          );

          if (categoryIds.length > 0) {
            await tx.insert(assignmentCategories).values(
              categoryIds.map((categoryId: string) => ({
                assignmentId: insertedAssignment.id,
                categoryId,
              }))
            );
          }
        }

        return insertedAssignment;
      });
    },

    async getAllAssignments() {
      return await db.select().from(assignments);
    },

    async getAssignmentsByCohortIdAndIdentityId(identityId: string) {
      const userCohorts = await db
        .select()
        .from(cohortIdentities)
        .where(eq(cohortIdentities.identityId, identityId));

      const cohortIds = userCohorts.map((cm) => cm.cohortId);

      if (cohortIds.length === 0) {
        return [];
      }

      const allAssignments = await db
        .select({
          assignments: assignments,
          assignment_scores: assignmentScores,
          assignment_feedback: assignmentFeedback,
          categories: categories,
          assignment_fix_items: fixList,
        })
        .from(assignments)
        .innerJoin(
          assignmentScores,
          and(
            eq(assignments.id, assignmentScores.assignmentId),
            eq(assignmentScores.identityId, identityId),
            eq(assignmentScores.status, "published")
          )
        )
        .leftJoin(
          assignmentFeedback,
          eq(assignmentFeedback.assignmentScoreId, assignmentScores.id)
        )
        .leftJoin(categories, eq(assignmentFeedback.categoryId, categories.id))
        .leftJoin(fixList, eq(fixList.assignmentScoreId, assignmentScores.id))
        .where(inArray(assignments.cohortId, cohortIds));

      const assignmentMap = new Map();

      for (const row of allAssignments) {
        const assignmentId = row.assignments.id;

        if (!assignmentMap.has(assignmentId)) {
          assignmentMap.set(assignmentId, {
            ...row.assignments,
            feedback: [],
            fixList: [],
            categories: [],
          });
        }

        const assignment = assignmentMap.get(assignmentId);

        if (row.assignment_feedback && row.assignment_feedback.id) {
          const feedbackExists = assignment.feedback.some(
            (f: AssignmentFeedback) => f.id === row.assignment_feedback?.id
          );

          if (!feedbackExists) {
            let categoryName = "Unknown Category";
            if (row.categories && row.categories.id) {
              categoryName = row.categories.name;
            }

            assignment.feedback.push({
              ...row.assignment_feedback,
              categoryName,
            });
          }
        }

        if (row.assignment_fix_items && row.assignment_fix_items.id) {
          const fixItemExists = assignment.fixList.some(
            (f: FixItem) => f.id === row.assignment_fix_items?.id
          );

          if (!fixItemExists) {
            assignment.fixList.push(row.assignment_fix_items);
          }
        }
      }

      const result = Array.from(assignmentMap.values());

      console.log({ result: result });
      return result;
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
      feedbackDataArray: Array<{
        comment?: string;
        score?: number;
        categoryId?: string;
      }>;
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

        for (const feedback of args.feedbackDataArray) {
          if (
            feedback &&
            (feedback.comment !== undefined ||
              feedback.categoryId !== undefined)
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
      dueDate?: Date | null;
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

    async deleteFixItemById(id: string) {
      await db.delete(fixList).where(eq(fixList.id, id));
    },

    async updateFixStatusById(args: { id: string; newStatus: boolean }) {
      await db
        .update(fixList)
        .set({
          isCompleted: args.newStatus,
          updatedAt: new Date(),
        })
        .where(eq(fixList.id, args.id));

      return args.newStatus;
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
