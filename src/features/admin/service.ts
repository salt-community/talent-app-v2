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
      if (
        !hasAccess(
          "admin.getAllDeveloperProfiles",
          "15086cf4-1111-4751-b379-5fdae699d68d"
        )
      ) {
        throw new Error("You do not have access to view developer profiles");
      }
      return getAllDeveloperProfiles();
    },
  };
}
