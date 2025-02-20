import { checkAccess, hasAccess } from "./check-access";
import { createRepository } from "./repository";
import { IdentityInsert } from "./schema";
import { Db } from "@/db";
import { auth } from "@clerk/nextjs/server";
import { iamService, SessionClaims } from "@/features";
import { validateSessionClaims } from "./logic";
import { claim } from "./session";
import { Permission, ViewPermission } from "./permissions";

export function createService(db: Db) {
  const repository = createRepository(db);
  return {
    async getAllIdentities() {
      return repository.getAllIdentities();
    },
    async getAllRolesByUserId(userId: string) {
      return repository.getAllRolesByUserId(userId);
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
      const { userId, sessionClaims } = await auth();

      if (!userId) return { id: "", role: "guest" };

      const existingUser = await repository.getUserId(userId);
      if (existingUser) return existingUser;

      return await iamService.createUserIfValid(userId, sessionClaims);
    },

    async createUserIfValid(userId: string, sessionClaims: SessionClaims) {
      const SALT_DOMAIN = "appliedtechnology.se";
      if (!validateSessionClaims(sessionClaims))
        return { id: "", role: "guest" };

      const { name, email, domain } = claim(sessionClaims);
      if (domain !== SALT_DOMAIN || !email) return { id: "", role: "guest" };

      return await repository.addIdentity({ name, email, clerkId: userId });
    },

    async getCurrentUser() {
      const { userId } = await auth();
      if (!userId) return null;
      const user = await repository.getUserId(userId);
      return user;
    },

    async addIdentity(identity: IdentityInsert) {
      return repository.addIdentity(identity);
    },
    async hasProfileAccess(identityId: string) {
      const { userId } = await auth();
      if (!userId) return false;
      const { id } = await repository.getIdentityRole(userId);
      return id === identityId ? true : false;
    },

    async hasCurrentUserAccess(permission: ViewPermission) {
      const { userId } = await auth();
      if (!userId) return false;
      const roles: string[] = ["guest"];
      const identityRole = await repository.getIdentityRole(userId);
      if (!identityRole) return false;
      roles.push(identityRole.roles);
      return hasAccess(roles, permission);
    },

    async checkAccess(permission: Permission, roles: string[]): Promise<void> {
      return checkAccess(roles, permission);
    },
  };
}
