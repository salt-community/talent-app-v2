import { Db } from "@/db";
import { eq } from "drizzle-orm";
import { DeveloperProfileInsert, developerProfiles } from "./schema";
import { DeveloperProfileStatus } from "./types";

export function createDevelopersRepository(db: Db) {
  return {
    async getAll() {
      return await db.select().from(developerProfiles).execute();
    },
    async getById(id: string) {
      const developerId = await db
        .select({ id: developerProfiles.id })
        .from(developerProfiles)
        .where(eq(developerProfiles.identityId, id));
      return developerId[0].id;
    },
    async add(developerProfile: DeveloperProfileInsert) {
      const devId = await db
        .insert(developerProfiles)
        .values(developerProfile)
        .returning({ id: developerProfiles.id });
      return devId[0];
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
