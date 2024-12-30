import { db } from "@/db";
import { createService } from "./service";
import { iamService } from "@/features";

export const scoresService = createService(db, iamService.checkAccess);
