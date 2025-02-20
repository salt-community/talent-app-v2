import { eq } from "drizzle-orm";
import {
  backgrounds,
  BackgroundInsert,
  DB,
  skills,
  languages,
  educations,
  meiliSearchOutbox,
  SkillSelect,
  LanguageSelect,
  EducationSelect,
} from "./db";
import { BackgroundUpdate } from "./types";
import { highlightedDevelopers } from "./db/posts-data";
import { sql } from "drizzle-orm";

export function createRepository(db: DB) {
  const posts = highlightedDevelopers;
  return {
    async getAllBackgrounds() {
      return db
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
    async getAllDeveloperProfileIds() {
      const developerId = db
        .select({ developerProfileId: backgrounds.developerProfileId })
        .from(backgrounds);

      return (await developerId).map(
        (developerId) => developerId.developerProfileId
      );
    },
    async getBackgroundByDeveloperProfileId(developerProfileId: string) {
      return db
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
    async getSkillsByBackgroundId(backgroundId: number) {
      return db
        .select()
        .from(skills)
        .where(eq(skills.backgroundId, backgroundId));
    },
    async getLanguagesByBackgroundId(backgroundId: number) {
      return db
        .select()
        .from(languages)
        .where(eq(languages.backgroundId, backgroundId));
    },
    async getEducationsByBackgroundId(backgroundId: number) {
      return db
        .select()
        .from(educations)
        .where(eq(educations.backgroundId, backgroundId));
    },
    async add(background: BackgroundInsert) {
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
    async update(background: BackgroundUpdate) {
      const outboxMessageId = await db.transaction(async (tx) => {
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
          await tx.insert(educations).values({ backgroundId, name: education });
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
    async getAllSkills() {
      return await db.select().from(skills);
    },
    async getAllLanguages() {
      return await db.select().from(languages);
    },
    async getAllEducations() {
      return await db.select().from(educations);
    },
    async getAllOutboxMessage() {
      return await db.select().from(meiliSearchOutbox);
    },
    async removeOutboxMessage(id: number) {
      await db.delete(meiliSearchOutbox).where(eq(meiliSearchOutbox.id, id));
    },
    async getAllPosts() {
      return posts;
    },
    async getPostById(id: string) {
      return posts.find((post) => post.id === id);
    },
    async deleteBackgroundById(developerProfileId: string) {
      await db
        .delete(backgrounds)
        .where(eq(backgrounds.developerProfileId, developerProfileId));
    },
  };
}
export type Repository = ReturnType<typeof createRepository>;
