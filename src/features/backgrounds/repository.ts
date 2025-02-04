import { eq } from "drizzle-orm";
import {
  backgrounds,
  BackgroundInsert,
  DB,
  skills,
  languages,
  educations,
  meiliSearchOutbox,
} from "./db";
import { BackgroundUpdate } from "./types";
import { highlightedDevelopers } from "./db/posts-data";

export function createRepository(db: DB) {
  const posts = highlightedDevelopers;
  return {
    async getAllBackgrounds() {
      return db.select().from(backgrounds);
    },
    async getAllDevIds() {
      return db.select({ devId: backgrounds.devId }).from(backgrounds);
    },
    async getBackgroundByDevId(devId: string) {
      return db.select().from(backgrounds).where(eq(backgrounds.devId, devId));
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
              .values({ devId: background.devId, operation: "upsert" })
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
            .values({ devId: background.devId, operation: "upsert" })
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
      return await db.select().from(skills);
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
  };
}
export type Repository = ReturnType<typeof createRepository>;
