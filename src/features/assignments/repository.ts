import { Db } from "@/db";
import { eq } from "drizzle-orm";
import { AssignmentScoreFormData, NewAssignment } from "./types";
import { assignmentsTable, assignmentScores } from "./schema";

export function createAssignmentsRepository(db: Db) {
  return {
    async createAssignment(data: NewAssignment) {
      const [insertedAssignment] = await db
        .insert(assignmentsTable)
        .values({
          ...data,
          cohortId: data.cohortId ?? "",
        })
        .returning();
      return insertedAssignment;
    },

    async getAssignmentById(id: string) {
      const [assignment] = await db
        .select()
        .from(assignmentsTable)
        .where(eq(assignmentsTable.id, id));
      return assignment;
    },

    async getAssignmentsByCohortId(cohortId: string) {
      return await db
        .select()
        .from(assignmentsTable)
        .where(eq(assignmentsTable.cohortId, cohortId));
    },

    async createAssignmentScore(data: AssignmentScoreFormData) {
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
      await db.delete(assignmentsTable);
    },

    async deleteAssignment(assignmentId: string) {
      return await db
        .delete(assignmentsTable)
        .where(eq(assignmentsTable.id, assignmentId));
    },

    async updateAssignment(id: string, data: Partial<NewAssignment>) {
      const [updatedAssignment] = await db
        .update(assignmentsTable)
        .set({
          ...data,
          cohortId: data.cohortId ?? "",
        })
        .where(eq(assignmentsTable.id, id))
        .returning();
      return updatedAssignment;
    },

    async getAssignmentsByCohort(cohortId: string) {
      return await db
        .select()
        .from(assignmentsTable)
        .where(eq(assignmentsTable.cohortId, cohortId));
    },
  };
}
