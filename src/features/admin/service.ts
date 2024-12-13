import { Db } from "@/db";
// import { createAdminRepository } from "./repository";
import { developerService } from "../developer-profiles/instance";

export function createAdminService(
  db: Db,
  getAllDeveloperProfiles: typeof developerService.getAllDeveloperProfiles,
) {
  // const repository = createAdminRepository(db);
  return {
    getAllDeveloperProfiles() {
      return getAllDeveloperProfiles();
    },
  };
}
