import { Db } from "@/db";
import { assignmentTable } from "./schema";
import { eq } from "drizzle-orm";
import type { Assignment, NewAssignment } from "./types";

export function createRepository(db: Db) {
  return {
    async addAssignment(newAssignment: NewAssignment) {
      const assignmentToInsert = {
        ...newAssignment, 
        tags: newAssignment.tags ?? [], 
      }; 
      await db.insert(assignmentTable).values(assignmentToInsert);
    },
    async getAssignmentsById(devId: string): Promise<Assignment[]> {
      return (await db
        .select()
        .from(assignmentTable)
        .where(eq(assignmentTable.devId, devId))) as Assignment[];
    },
    async deleteAllAssignments() {
      await db.delete(assignmentTable);
    },
    async deleteAssignment(id: number) {
      const result = await db.delete(assignmentTable).where(eq(assignmentTable.id, id));
      return result.rowCount !== 0;
    },
    async getAssignmentById(id: number) {
      return await db
        .select()
        .from(assignmentTable)
        .where(eq(assignmentTable.id, id));
    },
    async updateAssignment(id: number, updates: NewAssignment) {
      return await db
        .update(assignmentTable)
        .set(updates)
        .where(eq(assignmentTable.id, id))
        .returning();
    },
  };
}
