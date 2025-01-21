import { AssignmentsService } from "@/features";
import { PermissionsSchema } from "../secure-service";

export const assignments: PermissionsSchema<"assignments", AssignmentsService> =
  {
    addAssignment: "assignments.addAssignment",
    deleteAllAssignments: "assignments.deleteAllAssignments",
    deleteAssignment: "assignments.deleteAssignment",
    getAssignmentById: "assignments.getAssignmentById",
    getAssignmentsByDeveloperProfileId:
      "assignments.getAssignmentsByDeveloperProfileId",
    updateAssignment: "assignments.updateAssignment",
  };
