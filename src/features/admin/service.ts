import {
  DeleteDeveloperProfile,
  GetAllDeveloperProfiles,
  UpdateStatus,
  CreateAssignment,
  NewAssignment,
  GetAllCohorts,
  GetAllAssignments,
} from "@/features";
import { SearchConfigurationClient } from "./types";
import { Settings } from "meilisearch";

export function createAdminService(
  getAllDeveloperProfiles: GetAllDeveloperProfiles,
  deleteDeveloperProfile: DeleteDeveloperProfile,
  updateStatus: UpdateStatus,
  createAssignment: CreateAssignment,
  getAllAssignments: GetAllAssignments,
  getAllCohorts: GetAllCohorts,
  searchConfigurationClient: SearchConfigurationClient
) {
  return {
    async getAllDeveloperProfiles() {
      return await getAllDeveloperProfiles();
    },
    async deleteDeveloperProfile(id: string) {
      await deleteDeveloperProfile(id);
    },
    async updateStatus(id: string, status: string) {
      await updateStatus({ id, status });
    },
    async isSearchHealthOk() {
      return await searchConfigurationClient.isHealthOk();
    },
    async repopulateSearch() {
      await searchConfigurationClient.repopulate();
    },
    async syncSearch() {
      await searchConfigurationClient.sync();
    },
    async doesSearchNeedSync() {
      return await searchConfigurationClient.doesNeedSync();
    },
    async getSearchSettings() {
      return await searchConfigurationClient.getSettings();
    },
    async updateSearchSettings(settings: Settings) {
      await searchConfigurationClient.updateSettings(settings);
    },
    async resetSearchSettings() {
      await searchConfigurationClient.resetSettings();
    },
    async getAllAssignments() {
      return await getAllAssignments();
    },
    async getAllCohorts() {
      return await getAllCohorts();
    },
    async createAssignment(assignment: NewAssignment) {
      // await checkAccess("admin.createAssignment"); problem for another day
      return await createAssignment(assignment);
    },
  };
}
