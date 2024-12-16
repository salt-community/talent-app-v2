import { Db } from "@/db";
import { assignmentTable } from "./schema";
import { eq } from "drizzle-orm";
import { AssignmentUpdates, NewAssignment } from "./types";

export function createRepository(db: Db) {
  return {
    async addAssignment(newAssignment: NewAssignment) {
      await db.insert(assignmentTable).values(newAssignment);
    },
    async getAssignmentsById(devId: string) {
      return await db
        .select()
        .from(assignmentTable)
        .where(eq(assignmentTable.devId, devId));
    },
    async deleteAllAssignments() {
      await db.delete(assignmentTable);
    },
    async deleteAssignment(id: number) {
      await db.delete(assignmentTable).where(eq(assignmentTable.id, id));
    },
    async getAssignmentById(id: number) {
      return await db
        .select()
        .from(assignmentTable)
        .where(eq(assignmentTable.id, id));
    },
    async updateAssignment(id: number, updates: AssignmentUpdates) {
      return await db
        .update(assignmentTable)
        .set(updates)
        .where(eq(assignmentTable.id, id))
        .returning();
    },
  };
}
