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
      await deleteDeveloperProfile(id);
    },
    async updateStatus(id: string, status: DeveloperProfileStatus) {
      await updateStatus(id, status);
    },
  };
}
