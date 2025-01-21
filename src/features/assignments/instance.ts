import { db } from "@/db";
import { createAssignmentsService } from "./service";
import { iamService } from "@/features";

export const assignmentsService = createAssignmentsService(
  db,
  iamService.checkAccess
);
