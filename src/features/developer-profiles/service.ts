import { Db } from "@/db";
import { createDevelopersRepository } from "./repository";
import { DeveloperProfileInsert } from "./schema";

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
    async updateStatus(
      id: string,
      status: "unpublished" | "published" | "highlighted"
    ) {
      await repository.updateStatus(id, status);
    },
  };
}
