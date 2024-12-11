import { Db } from "@/db";
import { assignmentTable, scoresTable } from "./schema";
import { eq } from "drizzle-orm";
import { NewAssignment, NewScores } from "./types";


export function createRepository(db: Db) {
  return {
    async getById(userId: number) {
      return await db.select().from(scoresTable).where(eq(scoresTable.id, userId));
    },
    async updateScore(userId: number, newScores: NewScores) {
      await db.update(scoresTable)
        .set(newScores)
        .where(eq(scoresTable.id, userId));
    },
    async addScore(newScores: NewScores) {
      await db.insert(scoresTable).values(newScores);
    },
    async addAssignment(newAssigment: NewAssignment){
      await db.insert(assignmentTable).values(newAssigment)
    },
    async getAssignmentsById(userId: number) {
      return await db.select().from(assignmentTable).where(eq(assignmentTable.userId, userId))
    },
    async deleteAllAssignments() {
      await db.delete(assignmentTable)
    },
/*     async updateAssigment(id: number) { //not done
      await db.update(id).set().where(eq(assignmentTable.id, id));
    }, */
  };
}
