import { Db } from "@/db";
import { eq } from "drizzle-orm";
import { backgroundsTable, BackgroundInsert, BackgroundUpdate } from "./schema";

export function createRepository(db: Db) {
  return {
    async getAll() {
      return await db.select().from(backgroundsTable).orderBy(backgroundsTable.id);
    },
    async getByUUID(uuid: string) {
      return await db
        .select()
        .from(backgroundsTable)
        .where(eq(backgroundsTable.uuid, uuid));
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
