import { Db } from "@/db";
import { and, eq } from "drizzle-orm";
import {
  assignmentFeedback,
  assignments,
  assignmentScores,
  categories,
} from "./schema";
import {
  AssignmentScore,
  AssignmentScoreFormData,
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
      return await db
        .select()
        .from(assignments)
        .leftJoin(
          assignmentScores,
          and(
            eq(assignments.id, assignmentScores.assignmentId),
            eq(assignmentScores.identityId, identityId)
          )
        )
        .where(
          and(
            eq(assignments.cohortId, cohortId),
            eq(assignmentScores.status, "published")
          )
        );
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
          score: assignmentScores.score,
          status: assignmentScores.status,
          comment: assignmentFeedback.comment,
          categoryId: assignmentFeedback.categoryId,
          categoryName: categories.name,
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

    async upsertAssignmentScore(
      scoreData: AssignmentScore,
      feedbackData?: { comment?: string; categoryId?: string }
    ) {
      return await db.transaction(async (tx) => {
        const [insertedScore] = await tx
          .insert(assignmentScores)
          .values({
            id: scoreData.id,
            assignmentId: scoreData.assignmentId,
            identityId: scoreData.identityId,
            score: scoreData.score,
            status: scoreData.status || "unpublished",
            updatedAt: new Date(),
          })
          .onConflictDoUpdate({
            target: assignmentScores.id,
            set: {
              score: scoreData.score,
              status: scoreData.status || "unpublished",
              updatedAt: new Date(),
            },
          })
          .returning();

        if (
          feedbackData &&
          (feedbackData.comment !== undefined ||
            feedbackData.categoryId !== undefined)
        ) {
          const existingFeedback = await tx
            .select({ id: assignmentFeedback.id })
            .from(assignmentFeedback)
            .where(eq(assignmentFeedback.assignmentScoreId, insertedScore.id))
            .limit(1);

          if (existingFeedback.length > 0) {
            await tx
              .update(assignmentFeedback)
              .set({
                comment: feedbackData.comment,
                categoryId: feedbackData.categoryId,
                updatedAt: new Date(),
              })
              .where(eq(assignmentFeedback.id, existingFeedback[0].id));
          } else {
            await tx.insert(assignmentFeedback).values({
              assignmentScoreId: insertedScore.id,
              comment: feedbackData.comment || "",
              categoryId: feedbackData.categoryId,
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
  };
}
