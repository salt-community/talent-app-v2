import { Db } from "@/db";
import { assignmentTable, assignmentScores } from "./schema";
import { eq } from "drizzle-orm";
import { NewAssignment } from "./types";

export function createAssignmentsRepository(db: Db) {
  return {
    async createAssignment(data: FormData) {
      const [insertedCohort] = await db
        .insert(assignmentTable)
        .values(data)
        .returning();
      return insertedCohort;
    },
    // title: varchar().notNull(),
    // tags: varchar().array().notNull(),
    // cohortId: uuid("cohort_id").notNull(),
    // comment: varchar("comment").default("no comment provided"),
    // categories: varchar("categories").array().default(["general"]),
    // createdAt: timestamp("created_at").defaultNow(),

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

    async createAssignmentScore(assignmentId: string, data: FormData) {
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

    async updateAssignment(assignmentId: string, data: FormData) {
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
