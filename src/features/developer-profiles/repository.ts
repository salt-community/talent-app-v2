import { Db } from "@/db";
import { eq, ne, sql } from "drizzle-orm";
import {
  backgrounds,
  developerProfiles,
  educations,
  languages,
  meiliSearchOutbox,
  skills,
} from "./db-schema";
import {
  BackgroundInsert,
  BackgroundUpdate,
  DeveloperProfileInsert,
  EducationSelect,
  LanguageSelect,
  SkillSelect,
} from "./types";

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
    async getBackgroundById(developerProfileId: string) {
      return await db
        .select({
          id: backgrounds.id,
          developerProfileId: backgrounds.developerProfileId,
          name: backgrounds.name,
          avatarUrl: backgrounds.avatarUrl,
          title: backgrounds.title,
          bio: backgrounds.bio,
          links: backgrounds.links,
          skills: sql<SkillSelect[]>`jsonb_agg(distinct jsonb_build_object(
                'id', ${skills.id},
                'name', ${skills.name},
                'backgroundId', ${skills.backgroundId},
                'level', ${skills.level}
              ))`.as("skills"),
          languages: sql<
            LanguageSelect[]
          >`jsonb_agg(distinct jsonb_build_object(
                'id', ${languages.id},
                'name', ${languages.name},
                'backgroundId', ${languages.backgroundId},
                'level', ${languages.level}
              ))`.as("languages"),
          educations: sql<
            EducationSelect[]
          >`jsonb_agg(distinct jsonb_build_object(
                'id', ${educations.id},
                'name', ${educations.name},
                'backgroundId', ${educations.backgroundId}
              ))`.as("educations"),
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
    async addBackground(background: BackgroundInsert) {
      const { outboxMessageId, backgroundId } = await db.transaction(
        async (tx) => {
          const backgroundId = (
            await tx
              .insert(backgrounds)
              .values(background)
              .returning({ id: backgrounds.id })
          )[0].id;

          await tx.delete(skills).where(eq(skills.backgroundId, backgroundId));
          for (const skill of background.skills) {
            await tx.insert(skills).values({ backgroundId, name: skill });
          }
          for (const language of background.languages) {
            await tx.insert(languages).values({ backgroundId, name: language });
          }
          for (const education of background.educations) {
            await tx
              .insert(educations)
              .values({ backgroundId, name: education });
          }

          const outboxMessageId = (
            await tx
              .insert(meiliSearchOutbox)
              .values({
                developerProfileId: background.developerProfileId,
                operation: "upsert",
              })
              .returning({ id: meiliSearchOutbox.id })
          )[0].id;

          return { outboxMessageId, backgroundId };
        }
      );
      return { outboxMessageId, backgroundId };
    },
    async updateBackground(background: BackgroundUpdate) {
      const outboxMessageId = await db.transaction(async (tx) => {
        // TODO: Don't use the primary key at all in this function.
        if (background.id === -1) {
          await tx.insert(backgrounds).values({
            developerProfileId: background.developerProfileId,
            bio: background.bio || "",
            name: background.name || "",
            title: background.title || "",
            avatarUrl: background.avatarUrl || "",
            links: background.links || [],
          });
        } else {
          const { id: backgroundId, ...rest } = background;
          await tx
            .update(backgrounds)
            .set({ ...rest })
            .where(eq(backgrounds.id, backgroundId));

          await tx.delete(skills).where(eq(skills.backgroundId, backgroundId));
          for (const skill of background.skills) {
            await tx.insert(skills).values({ backgroundId, name: skill });
          }
          await tx
            .delete(languages)
            .where(eq(languages.backgroundId, backgroundId));
          for (const language of background.languages) {
            await tx.insert(languages).values({ backgroundId, name: language });
          }
          await tx
            .delete(educations)
            .where(eq(educations.backgroundId, backgroundId));
          for (const education of background.educations) {
            await tx
              .insert(educations)
              .values({ backgroundId, name: education });
          }
        }

        return (
          await tx
            .insert(meiliSearchOutbox)
            .values({
              developerProfileId: background.developerProfileId,
              operation: "upsert",
            })
            .returning({ id: meiliSearchOutbox.id })
        )[0].id;
      });
      return { outboxMessageId };
    },
  };
}
