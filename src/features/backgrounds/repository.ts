import { Db } from "@/db";
import { eq } from "drizzle-orm";
import { backgroundsTable, BackgroundInsert, BackgroundUpdate } from "./schema";

export function createRepository(db: Db) {
  return {
    async getAll() {
      return await db
        .select()
        .from(backgroundsTable)
        .orderBy(backgroundsTable.id);
    },
    async getByDevId(devId: string) {
      return await db
        .select()
        .from(backgroundsTable)
        .where(eq(backgroundsTable.devId, devId));
    },
    async add(background: BackgroundInsert) {
      return await db.insert(backgroundsTable).values(background);
    },
    async update(background: BackgroundUpdate) {
      const { id, ...rest } = background;
      return db
        .update(backgroundsTable)
        .set({ ...rest })
        .where(eq(backgroundsTable.id, id));
    },
  };
}

export type Repository = ReturnType<typeof createRepository>;
