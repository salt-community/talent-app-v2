import { Db } from "@/db";
import { IdentityInsert, identities } from "./schema";
import { eq } from "drizzle-orm";

export function createRepository(db: Db) {
  return {
    async getAllIdentities() {
      return await db.select().from(identities);
    },
    async getIdentityById(id: string) {
      const identity = await db
        .select()
        .from(identities)
        .where(eq(identities.id, id));
      return identity[0];
    },
    async getUserId(id: string) {
      const userId = await db
        .select({ id: identities.id, role: identities.role })
        .from(identities)
        .where(eq(identities.clerkId, id));
      return userId[0];
    },
    async getAllUnassignedDevelopers() {
      return await db
        .select({ id: identities.id, name: identities.name })
        .from(identities)
        .where(eq(identities.role, "developer"));
    },
    async addIdentity(identity: IdentityInsert) {
      const userId = await db.insert(identities).values(identity).returning({
        id: identities.id,
        role: identities.role,
        name: identities.name,
        email: identities.email,
        clerkId: identities.clerkId,
      });
      return userId[0];
    },
    async getIdentityRole(id: string) {
      const role = await db
        .select({ id: identities.id, roles: identities.role })
        .from(identities)
        .where(eq(identities.clerkId, id));
      return role[0];
    },
    async updateRole(id: string, newRole: string) {
      await db
        .update(identities)
        .set({
          role: newRole,
        })
        .where(eq(identities.id, id));
    },
    async deleteIdentity(id: string) {
      await db.delete(identities).where(eq(identities.id, id));
    },
  };
}

export type Repository = ReturnType<typeof createRepository>;
