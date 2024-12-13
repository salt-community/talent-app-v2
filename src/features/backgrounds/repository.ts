import { Db } from "@/db";
import { eq } from "drizzle-orm";
import { backgrounds, BackgroundInsert, BackgroundUpdate } from "./db";

export function createRepository(db: Db) {
  return {
    async getAll() {
      return await db.select().from(backgrounds).orderBy(backgrounds.id);;
    },
    async getById(id: number) {
      return await db.select().from(backgrounds).where(eq(backgrounds.id, id));
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
