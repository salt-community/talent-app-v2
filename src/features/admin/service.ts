import {
  DeleteDeveloperProfile,
  DeveloperProfileStatus,
  GetAllDeveloperProfiles,
  UpdateStatus,
  CheckAccess,
} from "@/features";

export function createAdminService(
  getAllDeveloperProfiles: GetAllDeveloperProfiles,
  deleteDeveloperProfile: DeleteDeveloperProfile,
  updateStatus: UpdateStatus,
  checkAccess: CheckAccess
) {
  return {
    async getAllDeveloperProfiles() {
      await checkAccess("admin.getAllDeveloperProfiles");
      return await getAllDeveloperProfiles();
    },
    async deleteDeveloperProfile(id: string) {
      checkAccess("admin.deleteDeveloperProfile");
      await deleteDeveloperProfile(id);
    },
    async updateStatus(id: string, status: DeveloperProfileStatus) {
      checkAccess("admin.updateStatus");
      await updateStatus(id, status);
    },
  };
}
