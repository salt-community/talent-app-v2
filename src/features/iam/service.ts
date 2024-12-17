import { checkAccess } from "./check-access";
import { createRepository } from "./repository";
import { IdentityInsert } from "./schema";
import { Db } from "@/db";

import { ROLES } from "./roles";
import { auth } from "@clerk/nextjs/server";
type Role = keyof typeof ROLES;
type Permission = (typeof ROLES)[Role][number];

export function createService(db: Db) {
  const repository = createRepository(db);
  return {
    async getAllIdentities() {
      return repository.getAllIdentities();
    },
    async getIdentityById(id: string) {
      return await repository.getIdentityById(id);
    },
    async getUserId() {
      const { userId, getToken } = await auth();
      if (userId) {
        const token = await getToken();
        const id = await repository.getUserId(userId);
        if (!id) {
          const id = repository.addIdentity({ clerkId: userId });
          return { id, token };
        }
        return { id, token };
      }
    },
    async getToken() {
      const { getToken } = await auth();
      const token = await getToken();
      console.log("Token", token);
    },

    async addIdentity(identity: IdentityInsert) {
      await repository.addIdentity(identity);
    },
    async checkAccess(permission: Permission) {
      const { userId } = await auth();
      if (userId) {
        const roles = await repository.getIdentityRole(userId);
        return checkAccess(roles, permission);
      }
    },
  };
}
