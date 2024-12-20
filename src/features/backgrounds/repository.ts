import { eq } from "drizzle-orm";
import {
  backgrounds,
  BackgroundInsert,
  DB,
  skills,
  languages,
  educations,
  meiliSearchOutbox,
  OutboxMessageInsert,
} from "./db";
import { BackgroundUpdate } from "./types";
import { highlightedDevelopers } from "./db/posts-data";

export function createRepository(db: DB) {
  const posts = highlightedDevelopers
  return {
    async getAllBackgrounds() {
      return await db.query.backgrounds.findMany({
        with: { skills: true, languages: true, educations: true },
      });
    },
    async getBackgroundByDevId(devId: string) {
      return await db.query.backgrounds.findFirst({
        with: { skills: true, languages: true, educations: true },
        where: eq(backgrounds.devId, devId),
      });
    },
    async add(background: BackgroundInsert) {
      const { transactionId, backgroundId } = await db.transaction(
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

          const transactionId = (
            await tx
              .insert(meiliSearchOutbox)
              .values({ devId: background.devId, operation: "upsert" })
              .returning({ id: meiliSearchOutbox.id })
          )[0].id;

          return { transactionId, backgroundId };
        },
      );
      return { transactionId, backgroundId: backgroundId };
    },
    async update(background: BackgroundUpdate) {
      const transactionId = await db.transaction(async (tx) => {
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
      return { transactionId };
    },
    async getAllSkills() {
      return await db.query.skills.findMany();
    },
    async getAllLanguages() {
      return await db.query.languages.findMany();
    },
    async getAllEducations() {
      return await db.query.educations.findMany();
    },
    async getAllOutboxMessage() {
      return await db.query.meiliSearchOutbox.findMany();
    },
    async addOutboxItem(transaction: OutboxMessageInsert) {
      return await db.transaction(async (tx) => {
        await tx
          .delete(meiliSearchOutbox)
          .where(eq(meiliSearchOutbox.devId, transaction.devId));
        return (
          await tx
            .insert(meiliSearchOutbox)
            .values(transaction)
            .returning({ id: meiliSearchOutbox.id })
        )[0].id;
      });
    },
    async removeOutboxMessage(id: number) {
      await db.delete(meiliSearchOutbox).where(eq(meiliSearchOutbox.id, id));
    },
    async updateEducations(backgroundId: number, educationList: string[]) {
      await db.transaction(async (tx) => {
        await tx
          .delete(educations)
          .where(eq(educations.backgroundId, backgroundId));
        await tx
          .insert(educations)
          .values(educationList.map((name) => ({ backgroundId, name })));
      });
    },
    async getAllPosts() {
      return posts;
    },

    async getTransactionsByDev(devId: string) {
      return await db.query.meiliTransactions.findMany();
    },

    async addTransaction(transaction: TransactionInsert) {
      await db.insert(meiliTransactions).values(transaction);
    },

    async removeTransaction(id: number) {
      await db.delete(meiliTransactions).where(eq(meiliTransactions.id, id));
    },
  };
}
export type Repository = ReturnType<typeof createRepository>;
