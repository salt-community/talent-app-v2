import { Db } from "@/db";
import { DeveloperProfileInsert, developerProfiles } from "./schema";
import { eq } from "drizzle-orm";

export function createDeveloperRepository(db: Db) {
  return {
    async getAllDeveloperProfiles() {
      return await db.select().from(developerProfiles).execute();
    },
    async addDeveloperProfile(developerProfile: DeveloperProfileInsert) {
      await db.insert(developerProfiles).values(developerProfile).execute();
    },
    async deleteDeveloperProfile(id: string) {
      await db
        .delete(developerProfiles)
        .where(eq(developerProfiles.id, id))
        .execute();
    },
  };
}
