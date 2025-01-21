import { db } from "@/db";
import { createAssignmentsService } from "./service";
import { secureService } from "@/features";

const insecureAssignmentsService = createAssignmentsService(db);

export const assignmentsService = secureService(
  "assignments",
  insecureAssignmentsService
);
