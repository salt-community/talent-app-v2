import { Db } from "@/db";
import { DeveloperProfileInsert, developerProfiles } from "./schema";
import { eq } from "drizzle-orm";

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
    async updateStatus(
      id: string,
      statues: "unpublished" | "published" | "highlighted"
    ) {
      await db
        .update(developerProfiles)
        .set({ status: statues })
        .where(eq(developerProfiles.id, id))
        .execute();
    },
  };
}
