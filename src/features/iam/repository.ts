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
    async getUserId(id: string) {
      const userId = await db
        .select({ id: identities.id })
        .from(identities)
        .where(eq(identities.clerkId, id));
      return userId[0];
    },
    async addIdentity(identity: IdentityInsert) {
      const userId = await db
        .insert(identities)
        .values(identity)
        .returning({ id: identities.id });
      return userId[0];
    },
    async getIdentityRole(id: string) {
      const role = await db
        .select({ id: identities.id, roles: identities.role })
        .from(identities)
        .where(eq(identities.clerkId, id));
      return role[0];
    },
  };
}

export type Repository = ReturnType<typeof createRepository>;
