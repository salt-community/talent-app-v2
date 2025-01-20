import { db } from "@/db";
import { createService } from "./service";
import { iamService } from "@/features";

export const assignmentsService = createService(db, iamService.checkAccess);
