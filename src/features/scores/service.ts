import { Db } from "@/db";
import { createRepository } from "./repository";
import type { NewAssignment } from "./types";
import { assignmentUpdates, CheckAccess } from "@/features";
import { NotFoundError } from "@/lib";

export const createService = (db: Db, checkAccess: CheckAccess) => {
  const repository = createRepository(db);
  return {
    addAssignment: async (newAssignment: NewAssignment) => {      
      await checkAccess("scores.addAssignment");
      assignmentUpdates.parse(newAssignment);
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
      const result = await repository.deleteAssignment(id);
      if (!result)
        throw new NotFoundError("Error occurred when deleting assignment");
    },
    getAssignmentById: async (id: number) => {
      const assignment = await repository.getAssignmentById(id);
      if (assignment.length === 0)
        throw new NotFoundError("Error occurred when getting assignment");
      return assignment[0];
    },
    updateAssignment: async (id: number, rawData: NewAssignment) => {
      await checkAccess("scores.addAssignment");
      const updates = assignmentUpdates.parse(rawData);
      return await repository.updateAssignment(id, updates);
    },
  };
};
