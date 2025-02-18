import { checkAccess } from "./check-access";
import { createRepository } from "./repository";
import { IdentityInsert } from "./schema";
import { Db } from "@/db";
import { auth } from "@clerk/nextjs/server";
import { SessionClaims } from "@/features";
import { validateSessionClaims } from "./logic";
import { claim } from "./session";
import { Permission } from "./permissions";

export function createService(db: Db) {
  const repository = createRepository(db);
  return {
    async getAllIdentities() {
      return repository.getAllIdentities();
    },

    async getIdentityById(id: string) {
      return await repository.getIdentityById(id);
    },
    async getAllUnassignedDevelopers() {
      return await repository.getAllUnassignedDevelopers();
    },

    async updateRole(id: string, newRole: string) {
      await repository.updateRole(id, newRole);
    },

    async deleteIdentity(id: string) {
      await repository.deleteIdentity(id);
    },
    async controlUser() {
      const SALT_DOMAIN = "appliedtechnology.se";
      const { userId, sessionClaims } = await auth();

      if (!userId) {
        return { id: "", role: "not signed in" };
      }

      const existingUser = await repository.getUserId(userId);

      if (existingUser) {
        return existingUser;
      }

      const claims = sessionClaims as SessionClaims;

      if (!validateSessionClaims(claims)) {
        return;
      }

      const { name, email, domain } = claim(claims);

      if (domain === SALT_DOMAIN) {
        if (!email) return;
        const newUser = await repository.addIdentity({
          name: name,
          email: email,
          clerkId: userId,
        });
        return newUser;
      }
    },

    async addIdentity(identity: IdentityInsert) {
      return repository.addIdentity(identity);
    },

    async checkUserAccess(identityId: string) {
      const { userId } = await auth();
      if (!userId) return false;

      const identity = await repository.getIdentityRole(userId);

      if (identity.roles === "admin") return true;

      return identity.id === identityId;
    },

    async checkAccess(permission: Permission): Promise<void> {
      const { userId } = await auth();
      const roles: string[] = ["guest"];

      if (userId) {
        const identityRole = await repository.getIdentityRole(userId);
        roles.push(identityRole.roles);
      }

      return checkAccess(roles, permission);
    },
  };
}
