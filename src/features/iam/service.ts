import { checkAccess } from "./check-access";
import { createRepository } from "./repository";
import { IdentityInsert } from "./schema";
import { Db, db } from "@/db";

import { ROLES } from "./roles";
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

    async addIdentity(identity: IdentityInsert) {
      await repository.addIdentity(identity);
    },
    async hasAccess(permission: Permission, id: string) {
      const roles = await repository.getIdentityRole(id);

      return checkAccess(roles, permission);
    },
  };
}
