import { Db } from "@/db";
import { createDeveloperRepository } from "./repository";
import { DeveloperProfileInsert } from "./schema";

export function createDeveloperService(db: Db) {
  const repository = createDeveloperRepository(db);
  return {
    async getAllDeveloperProfiles() {
      return await repository.getAllDeveloperProfiles();
    },
    async addDeveloper(developerProfile: DeveloperProfileInsert) {
      await repository.addDeveloperProfile(developerProfile);
    },
    async deleteDeveloper(id: string) {
      await repository.deleteDeveloperProfile(id);
    },
  };
}