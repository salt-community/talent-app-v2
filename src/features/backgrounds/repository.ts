import { eq } from "drizzle-orm";
import { backgrounds, BackgroundInsert, DB, skills, SkillInsert } from "./db";
import { BackgroundUpdate } from "./types";

export function createRepository(db: DB) {
  return {
    async getAll() {
      return await db.query.backgrounds.findMany({
        with: { skills: true, languages: true, educations: true },
      });
    },
    async getByDevId(devId: string) {
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

    async addSkills(skillList: SkillInsert[]) {
      return await db.insert(skills).values(skillList);
    },
  };
}

export type Repository = ReturnType<typeof createRepository>;
