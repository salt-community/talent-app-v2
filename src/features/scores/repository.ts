import { Db } from "@/db";
import { assignmentTable } from "./schema";
import { eq } from "drizzle-orm";
import { AssignmentUpdates, NewAssignment } from "./types";

export function createRepository(db: Db) {
  return {
    // async getById(userId: number) {
    //   return await db.select().from(scoresTable).where(eq(scoresTable.id, userId));
    // },
    // async updateScore(userId: number, newScores: NewScores) {
    //   await db.update(scoresTable)
    //     .set(newScores)
    //     .where(eq(scoresTable.id, userId));
    // },
    async addAssignment(newAssigment: NewAssignment){
      await db.insert(assignmentTable).values(newAssigment)
    },
    async getAssignmentsById(userId: number) {
      return await db.select().from(assignmentTable).where(eq(assignmentTable.userId, userId))
    },
    async deleteAllAssignments() {
      await db.delete(assignmentTable)
    },
    async getAssignmentById(id: number) {
      return await db
        .select()
        .from(assignmentTable)
        .where(eq(assignmentTable.id, id));
    },
    async updateAssigment(id: number, updates: AssignmentUpdates) {
      return await db
        .update(assignmentTable)
        .set(updates)
        .where(eq(assignmentTable.id, id))
        .returning();
    }
  };
}
