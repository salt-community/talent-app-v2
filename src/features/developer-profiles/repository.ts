import { Db } from "@/db";
import { eq } from "drizzle-orm";
import { DeveloperProfileInsert, developerProfiles } from "./schema";
import { DeveloperProfileStatus } from "./types";

export function createDevelopersRepository(db: Db) {
  return {
    async getAll() {
      return await db.select().from(developerProfiles).execute();
    },
    async add(developerProfile: DeveloperProfileInsert) {
      await db.insert(developerProfiles).values(developerProfile).execute();
    },
    async delete(id: string) {
      await db
        .delete(developerProfiles)
        .where(eq(developerProfiles.id, id))
        .execute();
    },
    async updateStatus(id: string, statues: DeveloperProfileStatus) {
      await db
        .update(developerProfiles)
        .set({ status: statues })
        .where(eq(developerProfiles.id, id))
        .execute();
    },
  };
}
