import { Db } from "@/db";
import { createAdminRepository } from "./repository";
import { DeveloperProfileInsert } from "./schema";

export function createAdminService(db: Db) {
  const repository = createAdminRepository(db);
  return {
    getAllDeveloperProfiles() {
      return repository.getAllDeveloperProfiles();
    },
    addDeveloperProfile(developerProfile: DeveloperProfileInsert) {
      return repository.addDeveloperProfile(developerProfile);
    },
  };
}
