import { Db } from "@/db";
import { developerService } from "../developer-profiles/instance";
import { iamService } from "../iam/instance";

export function createAdminService(
  db: Db,
  getAllDeveloperProfiles: typeof developerService.getAllDeveloperProfiles,
  hasAccess: typeof iamService.checkAccess
) {
  return {
    getAllDeveloperProfiles() {
      console.log(hasAccess("admin.getAllDeveloperProfiles"));
      if (!hasAccess("admin.getAllDeveloperProfiles")) {
        throw new Error("You do not have access to view developer profiles");
      }
      return getAllDeveloperProfiles();
    },
  };
}
