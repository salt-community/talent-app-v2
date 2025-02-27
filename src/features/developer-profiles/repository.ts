import { Db } from "@/db";
import { eq, ne, sql } from "drizzle-orm";
import {
  backgrounds,
  developerProfiles,
  educations,
  languages,
  skills,
} from "./db-schema";
import { DeveloperProfileInsert } from "./types";

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
    async getByIdentityId(identityId: string) {
      return await db
        .select()
        .from(developerProfiles)
        .where(eq(developerProfiles.identityId, identityId));
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
    async getAllBackgrounds() {
      return await db
        .select({
          id: backgrounds.id,
          developerProfileId: backgrounds.developerProfileId,
          name: backgrounds.name,
          avatarUrl: backgrounds.avatarUrl,
          title: backgrounds.title,
          bio: backgrounds.bio,
          links: backgrounds.links,
          skills: sql<
            string[]
          >`ARRAY_AGG(DISTINCT ${skills.name})::VARCHAR[]`.as("skills"),
          languages: sql<
            string[]
          >`ARRAY_AGG(DISTINCT ${languages.name})::VARCHAR[]`.as("languages"),
          educations: sql<
            string[]
          >`ARRAY_AGG(DISTINCT ${educations.name})::VARCHAR[]`.as("educations"),
        })
        .from(backgrounds)
        .leftJoin(skills, eq(skills.backgroundId, backgrounds.id))
        .leftJoin(languages, eq(languages.backgroundId, backgrounds.id))
        .leftJoin(educations, eq(educations.backgroundId, backgrounds.id))
        .groupBy(backgrounds.id);
    },
    async getBackgroundByDeveloperProfileId(developerProfileId: string) {
      return await db
        .select({
          id: backgrounds.id,
          developerProfileId: backgrounds.developerProfileId,
          name: backgrounds.name,
          avatarUrl: backgrounds.avatarUrl,
          title: backgrounds.title,
          bio: backgrounds.bio,
          links: backgrounds.links,
          skills: sql<
            string[]
          >`ARRAY_AGG(DISTINCT ${skills.name})::VARCHAR[]`.as("skills"),
          languages: sql<
            string[]
          >`ARRAY_AGG(DISTINCT ${languages.name})::VARCHAR[]`.as("languages"),
          educations: sql<
            string[]
          >`ARRAY_AGG(DISTINCT ${educations.name})::VARCHAR[]`.as("educations"),
        })
        .from(backgrounds)
        .leftJoin(skills, eq(skills.backgroundId, backgrounds.id))
        .leftJoin(languages, eq(languages.backgroundId, backgrounds.id))
        .leftJoin(educations, eq(educations.backgroundId, backgrounds.id))
        .where(
          eq(
            backgrounds.developerProfileId,
            sql.raw(`'${developerProfileId}'::uuid`)
          )
        )
        .groupBy(backgrounds.id);
    },
  };
}
