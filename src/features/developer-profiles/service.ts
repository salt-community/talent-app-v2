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
    async getById(identityId: string) {
      return await repository.getById(identityId);
    },
    async getAllById(identityId: string) {
      return await repository.getAllById(identityId);
    },
    async add(developerProfile: DeveloperProfileInsert) {
      return await repository.add(developerProfile);
    },
    async delete(id: string) {
      await repository.delete(id);
    },
    async updateStatus(id: string, status: DeveloperProfileStatus) {
      await repository.updateStatus(id, status);
    },
    async getStatusById(id: string) {
      return await repository.getStatusById(id);
    },
    async getHighlightedDevIds() {
      const highlighted = await repository.getAll();
      return highlighted
        .filter((dev) => dev.status === "highlighted")
        .map((dev) => dev.id);
    },
  };
}
