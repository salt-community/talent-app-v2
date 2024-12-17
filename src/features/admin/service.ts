import {
  DeleteDeveloperProfile,
  DeveloperProfileStatus,
  GetAllDeveloperProfiles,
  UpdateStatus,
} from "../developer-profiles";
import { checkAccess } from "../iam";

export function createAdminService(
  getAllDeveloperProfiles: GetAllDeveloperProfiles,
  deleteDeveloperProfile: DeleteDeveloperProfile,
  updateStatus: UpdateStatus,
  checkAccess: checkAccess
) {
  return {
    async getAllDeveloperProfiles() {
      if (!(await checkAccess("admin.getAllDeveloperProfiles"))) {
        throw new Error("You do not have permission");
      }
      return await getAllDeveloperProfiles();
    },
    async deleteDeveloperProfile(id: string) {
      await deleteDeveloperProfile(id);
    },
    async updateStatus(id: string, status: DeveloperProfileStatus) {
      await updateStatus(id, status);
    },
  };
}
