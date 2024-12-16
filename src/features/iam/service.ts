import { hasAccess } from "./has-access";
import { Repository } from "./repository";
import { IdentityInsert } from "./schema";

import { ROLES } from "./roles";
type Role = keyof typeof ROLES;
type Permission = (typeof ROLES)[Role][number];

export function createService(repository: Repository) {
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
    async hasAccess(id: string, permission: Permission) {
      const roles = await repository.getIdentityRole(id);

      return hasAccess(roles, permission);
    },
  };
}
