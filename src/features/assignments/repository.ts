import { Db } from "@/db";
import { and, eq } from "drizzle-orm";
import { assignments, assignmentScores } from "./schema";
import {
  AssignmentScore,
  AssignmentScoreFormData,
  NewAssignment,
} from "./types";
import { ScoreStatus } from "../instructors-dashboard/types";

export function createAssignmentsRepository(db: Db) {
  return {
    async createAssignment(assigment: NewAssignment) {
      const [insertedAssignment] = await db
        .insert(assignments)
        .values(assigment)
        .returning();
      return insertedAssignment;
    },

    async getAllAssignments() {
      return await db.select().from(assignments);
    },

    async getAssignmentsByCohortIdAndIdentityId(
      cohortId: string,
      identityId: string,
    ) {
      return await db
        .select()
        .from(assignments)
        .leftJoin(
          assignmentScores,
          and(
            eq(assignments.id, assignmentScores.assignmentId),
            eq(assignmentScores.identityId, identityId),
          ),
        )
        .where(
          and(
            eq(assignments.cohortId, cohortId),
            eq(assignmentScores.status, "published"),
          ),
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

    async upsertAssignmentScore(score: AssignmentScore) {
      await db
        .insert(assignmentScores)
        .values(score)
        .onConflictDoUpdate({
          target: assignmentScores.id,
          set: {
            score: score.score,
            comment: score.comment,
          },
        });
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
                  eq(assignmentScores.identityId, identityId),
                ),
              );
          }),
        );
      });
    },

    async getScoresByAssignmentId(assignmentId: string) {
      return await db
        .select()
        .from(assignmentScores)
        .where(eq(assignmentScores.assignmentId, assignmentId));
    },

    async getScoresByIdentityId(identityId: string) {
      return await db
        .select({
          score: assignmentScores.score,
          category: assignmentScores.category,
        })
        .from(assignmentScores)
        .where(eq(assignmentScores.identityId, identityId));
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
      console.log("Updating assignment:", id, data);
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
