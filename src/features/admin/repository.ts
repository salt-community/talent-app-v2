import { Db } from "@/db";
import { DeveloperProfileInsert, developerProfiles } from "./schema";

export function createAdminRepository(db: Db) {
  return {
    async getAllDeveloperProfiles() {
      return await db.select().from(developerProfiles).execute();
    },
    async addDeveloperProfile(developerProfile: DeveloperProfileInsert) {
      return await db.insert(developerProfiles).values(developerProfile);
    },
  };
}
