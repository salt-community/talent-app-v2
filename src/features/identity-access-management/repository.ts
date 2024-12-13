import { Db } from "@/db";
import { IdentityInsert, identities } from "./schema";
import { eq } from "drizzle-orm";

export function createRepository(db: Db) {
  return {
    async getAllIdentities() {
      return await db.select().from(identities);
    },
    async getIdentityById(id: string) {
      return await db.select().from(identities).where(eq(identities.id, id));
    },
    async addIdentity(identity: IdentityInsert) {
      return await db
        .insert(identities)
        .values(identity)
        .returning({ id: identities.id });
    },
  };
}

export type Repository = ReturnType<typeof createRepository>;
