import { get } from "http";
import { hasAccess } from "./privileges";
import { Repository } from "./repository";
import { IdentityInsert } from "./schema";

export function createService(repository: Repository) {
  return {
    async getAllIdentities() {
      return repository.getAllIdentities();
    },
    async getIdentityById(id: number) {
      return hasAccess()
        ? await repository.getIdentityById(id)
        : "Access denied";
    },

    async addIdentity(identity: IdentityInsert) {
      await repository.addIdentity(identity);
    },
  };
}
