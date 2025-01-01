import {
  DeleteDeveloperProfile,
  DeveloperProfileStatus,
  GetAllDeveloperProfiles,
  UpdateStatus,
  CheckAccess,
} from "@/features";
import { MeilisearchConfigurationClient } from "./types";
import { Settings } from "meilisearch";

export function createAdminService(
  getAllDeveloperProfiles: GetAllDeveloperProfiles,
  deleteDeveloperProfile: DeleteDeveloperProfile,
  updateStatus: UpdateStatus,
  checkAccess: CheckAccess,
  meilisearchConfigurationClient: MeilisearchConfigurationClient,
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
      await meilisearchConfigurationClient.repopulate();
    },
    async syncMeilisearch() {
      await checkAccess("admin.syncMeilisearch");
      await meilisearchConfigurationClient.sync();
    },
    async doesMeilisearchNeedSync() {
      await checkAccess("admin.doesMeilisearchNeedSync");
      return await meilisearchConfigurationClient.doesNeedSync();
    },
    async getMeilisearchSettings() {
      await checkAccess("admin.getMeilisearchSettings");
      return await meilisearchConfigurationClient.getSettings();
    },
    async updateMeilisearchSettings(settings: Settings) {
      await checkAccess("admin.updateMeilisearchSettings");
      await meilisearchConfigurationClient.updateSettings(settings);
    },
    async resetMeilisearchSettings() {
      await checkAccess("admin.resetMeilisearchSettings");
      await meilisearchConfigurationClient.resetSettings();
    },
  };
}
