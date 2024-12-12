import { hasAccess } from "./privileges";
import { Repository } from "./repository";
import { IdentityInsert } from "./schema";

export function createService(repository: Repository) {
  return {
    async getIdentityById(id: number) {
      return hasAccess()
        ? await repository.getIdentityById(id)
        : "Access denied";
    },

    async addIdentity(identity: IdentityInsert) {
      return hasAccess()
        ? await repository.addIdentity(identity)
        : "Access denied";
    },
  };
}
