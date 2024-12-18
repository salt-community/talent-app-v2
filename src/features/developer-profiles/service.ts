import { Db } from "@/db";
import { createDevelopersRepository } from "./repository";
import { DeveloperProfileInsert } from "./schema";
import { DeveloperProfileStatus } from "./types";

export function createDevelopersService(db: Db) {
  const repository = createDevelopersRepository(db);
  return {
    async getAll() {
      return await repository.getAll();
    },
    async add(developerProfile: DeveloperProfileInsert) {
      await repository.add(developerProfile);
    },
    async delete(id: string) {
      await repository.delete(id);
    },
    async updateStatus(id: string, status: DeveloperProfileStatus) {
      await repository.updateStatus(id, status);
    },
    async getHighlightedDevIds() {
      const highlighted = await repository.getAll();
      return highlighted.filter((dev) => dev.status === "highlighted").map((dev) => dev.id)
    },

  };
}
