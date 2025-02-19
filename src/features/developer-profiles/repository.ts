import { Db } from "@/db";
import { eq, ne } from "drizzle-orm";
import { DeveloperProfileInsert, developerProfiles } from "./schema";

export function createDevelopersRepository(db: Db) {
  return {
    async getAll() {
      return await db.select().from(developerProfiles);
    },
    async getDeveloperById(id: string) {
      const developerId = await db
        .select()
        .from(developerProfiles)
        .where(eq(developerProfiles.id, id));
      return developerId[0];
    },
    async getAllById(id: string) {
      const developerId = await db
        .select({ id: developerProfiles.id })
        .from(developerProfiles)
        .where(eq(developerProfiles.identityId, id));
      return developerId;
    },
    async add(developerProfile: DeveloperProfileInsert) {
      const developerProfileId = await db
        .insert(developerProfiles)
        .values(developerProfile)
        .returning({ id: developerProfiles.id });
      return developerProfileId[0];
    },
    async delete(id: string) {
      await db.delete(developerProfiles).where(eq(developerProfiles.id, id));
    },
    async deleteByIdentityId(identityId: string) {
      await db
        .delete(developerProfiles)
        .where(eq(developerProfiles.identityId, identityId));
    },
    async getPublishedOrHighlightedDeveloperProfileIds() {
      return (
        await db
          .select({ devId: developerProfiles.id })
          .from(developerProfiles)
          .where(ne(developerProfiles.status, "unpublished"))
      ).map((row) => row.devId);
    },
    async updateStatus(id: string, status: string) {
      await db
        .update(developerProfiles)
        .set({
          status,
        })
        .where(eq(developerProfiles.id, id));
    },
    async getIdentityIdByDeveloperProfileId(developerProfileId: string) {
      const [developerProfile] = await db
        .select()
        .from(developerProfiles)
        .where(eq(developerProfiles.id, developerProfileId));

      return developerProfile?.identityId;
    },
    async getDeveloperProfileByIdentityId(identityId: string) {
      return await db
        .select()
        .from(developerProfiles)
        .where(eq(developerProfiles.identityId, identityId));
    },
    async existsBySlug(slug: string) {
      const [developerProfile] = await db
        .select()
        .from(developerProfiles)
        .where(eq(developerProfiles.slug, slug));

      return !!developerProfile;
    },
    async insertSlug(id: string, slug: string) {
      await db
        .update(developerProfiles)
        .set({
          slug,
        })
        .where(eq(developerProfiles.id, id));
    },
  };
}
