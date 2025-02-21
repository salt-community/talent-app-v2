import { AssignmentsService } from "@/features";
import { PermissionsSchema } from "../secure-service";

export const assignments: PermissionsSchema<"assignments", AssignmentsService> =
  {
    createAssignment: "assignments.createAssignment",
    deleteAllAssignments: "assignments.deleteAllAssignments",
    deleteAssignment: "assignments.deleteAssignment",
    getAssignmentById: "assignments.getAssignmentById",
    getAssignmentsByCohortId: "assignments.getAssignmentsByCohortId",
    getAssignmentsByCohort: "assignments.getAssignmentsByCohort",
    createAssignmentScore: "assignments.createAssignmentScore",
    getScoresByAssignmentId: "assignments.getScoresByAssignmentId",
    getAverageScoresByIdentityId: "assignments.getAverageScoresByIdentityId",
    updateAssignment: "assignments.updateAssignment",
    getAllAssignments: "assignments.getAllAssignments",
    deleteAssignmentScoreById: "assignments.deleteAssignmentScoreById",
    getCohortIdentity: "assignments.getCohortIdentity",
    getAllAverageScoresByIdentityId:
      "assignments.getAllAverageScoresByIdentityId",
  };
