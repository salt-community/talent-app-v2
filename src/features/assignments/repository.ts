import { Db } from "@/db";
import { assignmentTable, assignmentScores } from "./schema";
import { eq } from "drizzle-orm";

export function createAssignmentsRepository(db: Db) {
  return {
    async createAssignment(
      data: Omit<typeof assignmentTable.$inferInsert, "id">
    ) {
      const [assignment] = await db
        .insert(assignmentTable)
        .values(data)
        .returning();
      return assignment;
    },

    async getAssignmentById(assignmentId: string) {
      const [assignment] = await db
        .select()
        .from(assignmentTable)
        .where(eq(assignmentTable.id, assignmentId));
      return assignment;
    },

    async getAssignmentsByCohortId(cohortId: string) {
      return await db
        .select()
        .from(assignmentTable)
        .where(eq(assignmentTable.cohortId, cohortId));
    },

    async createAssignmentScore(
      data: Omit<typeof assignmentScores.$inferInsert, "id">
    ) {
      const [score] = await db
        .insert(assignmentScores)
        .values(data)
        .returning();
      return score;
    },

    async getScoresByAssignmentId(assignmentId: string) {
      return await db
        .select()
        .from(assignmentScores)
        .where(eq(assignmentScores.assignmentId, assignmentId));
    },

    async getScoresByIdentityId(identityId: string) {
      return await db
        .select()
        .from(assignmentScores)
        .where(eq(assignmentScores.identityId, identityId));
    },

    async deleteAllAssignments() {
      await db.delete(assignmentTable);
    },

    async deleteAssignment(assignmentId: string) {
      await db
        .delete(assignmentTable)
        .where(eq(assignmentTable.id, assignmentId));
    },

    async updateAssignment(
      assignmentId: string,
      data: Partial<Omit<typeof assignmentTable.$inferInsert, "id">>
    ) {
      const [updatedAssignment] = await db
        .update(assignmentTable)
        .set(data)
        .where(eq(assignmentTable.id, assignmentId))
        .returning();
      return updatedAssignment;
    },

    async getAssignmentsByCohort(cohortId: string) {
      return await db
        .select()
        .from(assignmentTable)
        .where(eq(assignmentTable.cohortId, cohortId));
    },
  };
}
