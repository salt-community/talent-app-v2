import { Db } from "@/db";
import { createRepository } from "./repository";
import type { NewAssignment } from "./types";
import { NotFoundError } from "@/lib";
import { assignmentUpdates } from "./validation";

export const createAssignmentsService = (db: Db) => {
  const repository = createRepository(db);
  return {
    addAssignment: async (newAssignment: NewAssignment) => {
      assignmentUpdates.parse(newAssignment);
      await repository.addAssignment(newAssignment);
    },
    getAssignmentsByDeveloperProfileId: async (devId: string) => {
      return await repository.getAssignmentsById(devId);
    },
    deleteAllAssignments: async () => {
      await repository.deleteAllAssignments();
    },
    deleteAssignment: async (id: number) => {
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
    updateAssignment: async (args: { id: number; rawData: NewAssignment }) => {
      const updates = assignmentUpdates.parse(args.rawData);
      return await repository.updateAssignment(args.id, updates);
    },
  };
};
