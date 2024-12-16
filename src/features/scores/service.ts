import { Db } from "@/db";
import { createRepository } from "./repository";
import type { AssignmentUpdates, NewAssignment } from "./types";
import { assignmentUpdates } from "./zod-validation";

export const createService = (db: Db) => {
  const repository = createRepository(db);
  return {
    addAssignment: async (newAssignment: NewAssignment) => {
      await repository.addAssignment(newAssignment);
    },
    getAssignmentsByUserId: async (userId: number) => {
      return await repository.getAssignmentsById(userId);
    },
    deleteAllAssignments: async () => {
      await repository.deleteAllAssignments();
    },
    deleteAssignment: async (id: number) => {
      await repository.deleteAssignment(id);
    },
    getAssignmentById: async (id: number) => {
      const assignment = await repository.getAssignmentById(id);
      if (assignment.length === 0)
        console.error("Error occured when getting assignment");
      return assignment[0];
    },
    updateAssignment: async (id: number, rawData: AssignmentUpdates) => {
      const updates = assignmentUpdates.parse(rawData); // Kan kasta fel som måste tas om hand.
      return await repository.updateAssignment(id, updates);
    },
  };
};
