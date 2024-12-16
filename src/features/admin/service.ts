import {
  DeleteDeveloperProfile,
  DevelopersStatus,
  GetAllDeveloperProfiles,
  UpdateStatus,
} from "../developer-profiles";

export function createAdminService(
  getAllDeveloperProfiles: GetAllDeveloperProfiles,
  deleteDeveloperProfile: DeleteDeveloperProfile,
  updateStatus: UpdateStatus
) {
  return {
    async getAllDeveloperProfiles() {
      return await getAllDeveloperProfiles();
    },
    async deleteDeveloperProfile(id: string) {
      await deleteDeveloperProfile(id);
    },
    async updateStatus(id: string, status: DevelopersStatus) {
      await updateStatus(id, status);
    },
  };
}
