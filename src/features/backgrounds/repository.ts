import { eq } from "drizzle-orm";
import {
  backgrounds,
  BackgroundInsert,
  DB,
  skills,
  SkillInsert,
  LanguageInsert,
  EducationInsert,
  languages,
  educations,
  meiliTransactions,
  TransactionInsert,
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
    async getBackgrounByDevId(devId: string) {
      return await db.query.backgrounds.findFirst({
        with: { skills: true, languages: true, educations: true },
        where: eq(backgrounds.devId, devId),
      });
    },
    async add(background: BackgroundInsert) {
      return (
        await db
          .insert(backgrounds)
          .values(background)
          .returning({ id: backgrounds.id })
      )[0].id;
    },
    async update(background: BackgroundUpdate) {
      const { id, ...rest } = background;
      return db
        .update(backgrounds)
        .set({ ...rest })
        .where(eq(backgrounds.id, id));
    },
    async getAllSkills() {
      return await db.query.skills.findMany();
    },
    async addSkills(skillList: SkillInsert[]) {
      return await db.insert(skills).values(skillList);
    },
    async getAllLanguages() {
      return await db.query.languages.findMany();
    },
    async addLanguages(languageList: LanguageInsert[]) {
      return await db.insert(languages).values(languageList);
    },
    async getAllEducations() {
      return await db.query.educations.findMany();
    },
    async addEducations(educationList: EducationInsert[]) {
      return await db.insert(educations).values(educationList);
    },

    async updateSkills(backgroundId: number, skillList: string[]) {
      await db.transaction(async (tx) => {
        await tx.delete(skills).where(eq(skills.backgroundId, backgroundId));
        await tx
          .insert(skills)
          .values(skillList.map((name) => ({ backgroundId, name })));
      });
    },

    async updateLanguages(backgroundId: number, languageList: string[]) {
      await db.transaction(async (tx) => {
        await tx
          .delete(languages)
          .where(eq(languages.backgroundId, backgroundId));
        await tx
          .insert(languages)
          .values(languageList.map((name) => ({ backgroundId, name })));
      });
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
