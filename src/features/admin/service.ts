import { Db } from "@/db";
import { developerService } from "../developer-profiles/instance";
import { iamService } from "../iam/instance";

export async function createAdminService(
  db: Db,
  getAllDeveloperProfiles: typeof developerService.getAllDeveloperProfiles,
  hasAccess: typeof iamService.checkAccess
) {
  return {
    async getAllDeveloperProfiles() {
      if (!(await hasAccess("admin.getAllDeveloperProfiles"))) {
        throw new Error("You do not have access to view developer profiles");
      }
      return getAllDeveloperProfiles();
    },
  };
}
