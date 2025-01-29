import { db } from "@/db";
import { createAssignmentsService } from "./service";
import { secureService } from "../iam";

export const assignmentsService = secureService(
  "assignments",
  createAssignmentsService(db)
);
