import { Db } from "@/db";
import { developerService } from "../developer-profiles/instance";
import { iamService } from "../iam/instance";

export function createAdminService(
  db: Db,
  getAllDeveloperProfiles: typeof developerService.getAllDeveloperProfiles,
  hasAccess: typeof iamService.hasAccess
) {
  return {
    getAllDeveloperProfiles() {
      if (!hasAccess("admin.getAllDeveloperProfiles", "1")) {
        throw new Error("You do not have access to view developer profiles");
      }
      return getAllDeveloperProfiles();
    },
  };
}
