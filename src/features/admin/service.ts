import {
  DeleteDeveloperProfile,
  DeveloperProfileStatus,
  GetAllDeveloperProfiles,
  UpdateStatus,
  CheckAccess,
} from "@/features";
import { RepopulateMeiliSearch } from "../backgrounds/types";

export function createAdminService(
  getAllDeveloperProfiles: GetAllDeveloperProfiles,
  deleteDeveloperProfile: DeleteDeveloperProfile,
  updateStatus: UpdateStatus,
  checkAccess: CheckAccess,
  repopulateMeilisearch: RepopulateMeiliSearch,
) {
  return {
    async getAllDeveloperProfiles() {
      await checkAccess("admin.getAllDeveloperProfiles");
      return await getAllDeveloperProfiles();
    },
    async deleteDeveloperProfile(id: string) {
      await checkAccess("admin.deleteDeveloperProfile");
      await deleteDeveloperProfile(id);
    },
    async updateStatus(id: string, status: DeveloperProfileStatus) {
      await checkAccess("admin.updateStatus");
      await updateStatus(id, status);
    },
    async repopulateMeilisearch() {
      await checkAccess("admin.repopulateMeilisearch");
      await repopulateMeilisearch();
    },
  };
}
