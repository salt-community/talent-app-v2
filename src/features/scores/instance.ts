import { db } from "@/db";
import { createService } from "./service";
import { iamService } from "@/features";

export const scoresService = createService(db, iamService.checkAccess);

export const seedScoresService = createService(
  db,
  async function checkAccess(permission: string): Promise<boolean> {
    if (permission) {
      return true;
    }
    return false;
  }
);
