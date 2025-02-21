import { db } from "@/db";
import { createAssignmentsService } from "./service";
import { secureService } from "../iam";
import { cohortsService } from "../cohorts";

export const insecureAssignmentService = createAssignmentsService(db);

export const assignmentsService = secureService(
  "assignments",
  insecureAssignmentService
);
