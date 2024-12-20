import { Db } from "@/db";
import { createRepository } from "./repository";
import type { AssignmentUpdates, NewAssignment } from "./types";
import { assignmentUpdates } from "./zod-validation";
import { CheckAccess } from "@/features";

export const createService = (db: Db, checkAccess: CheckAccess) => {
  const repository = createRepository(db);
  return {
    addAssignment: async (newAssignment: NewAssignment) => {
      await checkAccess("scores.addAssignment");
      await repository.addAssignment(newAssignment);
    },
    getAssignmentsByDevId: async (devId: string) => {
      await checkAccess("scores.getAssignmentsById");
      return await repository.getAssignmentsById(devId);
    },
    deleteAllAssignments: async () => {
      await checkAccess("scores.deleteAllAssignments");
      await repository.deleteAllAssignments();
    },
    deleteAssignment: async (id: number) => {
      await checkAccess("scores.deleteAssignment");
      await repository.deleteAssignment(id);
    },
    getAssignmentById: async (id: number) => {
      const assignment = await repository.getAssignmentById(id);
      if (assignment.length === 0)
        console.error("Error occured when getting assignment");
      return assignment[0];
    },
    updateAssignment: async (id: number, rawData: AssignmentUpdates) => {
      await checkAccess("scores.addAssignment");
      const updates = assignmentUpdates.parse(rawData); // Kan kasta fel som måste tas om hand.
      return await repository.updateAssignment(id, updates);
    },
  };
};
