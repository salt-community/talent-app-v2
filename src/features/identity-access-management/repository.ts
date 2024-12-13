import { Db } from "@/db";
import { IdentityInsert, identities } from "./schema";
import { eq } from "drizzle-orm";
import { get } from "http";

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
    async getIdentityRole(id: string) {
      const role = await db
        .select({ id: identities.id, roles: identities.roles })
        .from(identities)
        .where(eq(identities.id, id));
      return role[0];
    },
  };
}

export type Repository = ReturnType<typeof createRepository>;
