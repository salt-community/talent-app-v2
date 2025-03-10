import { db } from "@/db";
import { createAssignmentsService } from "./service";
import { secureService } from "../iam";

const insecureAssignmentService = createAssignmentsService(db);

export const assignmentsService = secureService(
  "assignments",
  insecureAssignmentService
);
export const assignmentsSeedingService = createAssignmentsService(db);
