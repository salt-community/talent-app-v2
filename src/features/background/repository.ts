import { db } from "@/db";
import { eq } from "drizzle-orm";
import { backgroundsTable, BackgroundInsert, BackgroundSelect } from "./schema";

type Link = {
  name: "Github" | "LinkedIn";
  url: string;
};

export type MockBackground = {
  id: number;
  name: string;
  title: string;
  bio: string;
  avatarURL: string;
  languages?: string[] | undefined;
  educations?: string[] | undefined;
  skills?: string[];
  links?: Link[] | undefined;
};

export function createRepository() {
  return {
    async getAll() {
      return await db.select().from(backgroundsTable);
    },
    async getById(id: number) {
      return await db
        .select()
        .from(backgroundsTable)
        .where(eq(backgroundsTable.id, id));
    },
    async add(background: BackgroundInsert) {
      return await db.insert(backgroundsTable).values({ ...background });
    },
    async update(background: BackgroundSelect) {
      const { id, ...rest } = background;
      return db
        .update(backgroundsTable)
        .set({ ...rest })
        .where(eq(backgroundsTable.id, id));
    },
  };
}

export type Repository = ReturnType<typeof createRepository>;
