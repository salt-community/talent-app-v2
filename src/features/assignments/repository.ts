import { Db } from "@/db";
import { and, eq } from "drizzle-orm";
import { assignments, assignmentScores } from "./schema";
import {
  AssignmentScore,
  AssignmentScoreFormData,
  NewAssignment,
} from "./types";

export function createAssignmentsRepository(db: Db) {
  return {
    async createAssignment(data: NewAssignment) {
      const [insertedAssignment] = await db
        .insert(assignments)
        .values({
          ...data,
          cohortId: data.cohortId ?? "",
        })
        .returning();
      return insertedAssignment;
    },

    async getAllAssignments() {
      return await db.select().from(assignments);
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
    async updateScoreStatus(args: {
      assignmentId: string;
      identityId: string;
      status: string;
    }) {
      await db
        .update(assignmentScores)
        .set({ status: args.status })
        .where(
          and(
            eq(assignmentScores.assignmentId, args.assignmentId),
            eq(assignmentScores.identityId, args.identityId)
          )
        )
        .returning();
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
        .where(eq(assignments.id, assignmentId));
    },
    async deleteAssignmentScoreById(identityId: string) {
      await db
        .delete(assignmentScores)
        .where(eq(assignmentScores.identityId, identityId));
    },

    async updateAssignment(id: string, data: Partial<NewAssignment>) {
      const [updatedAssignment] = await db
        .update(assignments)
        .set({
          ...data,
          cohortId: data.cohortId ?? "",
        })
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
