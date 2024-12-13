import { eq } from "drizzle-orm";
import { backgrounds, BackgroundInsert, BackgroundUpdate, DB } from "./db";

export function createRepository(db: DB) {
  return {
    async getAll() {
      return await db.query.backgrounds.findMany();
    },
    async getById(id: number) {
      return await db.query.backgrounds.findFirst({
        where: eq(backgrounds.id, id),
      });
    },
    async add(background: BackgroundInsert) {
      return await db.insert(backgrounds).values(background);
    },
    async update(background: BackgroundUpdate) {
      const { id, ...rest } = background;
      return db
        .update(backgrounds)
        .set({ ...rest })
        .where(eq(backgrounds.id, id));
    },
  };
}

export type Repository = ReturnType<typeof createRepository>;
