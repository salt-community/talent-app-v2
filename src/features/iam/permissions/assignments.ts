import { AssignmentsService } from "@/features";
import { PermissionsSchema } from "../secure-service";
import { PagePermissionsSchema } from "./types";

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
    getAllAverageScoresByIdentityId:
      "assignments.getAllAverageScoresByIdentityId",
    getAssignmentBySlug: "assignments.getAssignmentBySlug",
  };

type AssignmentViewPermission = "score";

type AssignmentViewPermissions = Record<AssignmentViewPermission, string>;

export const assignmentPermissions: PagePermissionsSchema<
  "assignment",
  AssignmentViewPermissions
> = {
  score: "assignment.score",
};
