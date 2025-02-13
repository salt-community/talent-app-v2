import {
  DeleteDeveloperProfile,
  GetAllDeveloperProfiles,
  UpdateStatus,
  CheckAccess,
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
  checkAccess: CheckAccess,
  searchConfigurationClient: SearchConfigurationClient
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
    async updateStatus(id: string, status: string) {
      await checkAccess("admin.updateStatus");
      await updateStatus({ id, status });
    },
    async isSearchHealthOk() {
      await checkAccess("admin.isSearchHealthOk");
      return await searchConfigurationClient.isHealthOk();
    },
    async repopulateSearch() {
      await checkAccess("admin.repopulateSearch");
      await searchConfigurationClient.repopulate();
    },
    async syncSearch() {
      await checkAccess("admin.syncSearch");
      await searchConfigurationClient.sync();
    },
    async doesSearchNeedSync() {
      await checkAccess("admin.doesSearchNeedSync");
      return await searchConfigurationClient.doesNeedSync();
    },
    async getSearchSettings() {
      await checkAccess("admin.getSearchSettings");
      return await searchConfigurationClient.getSettings();
    },
    async updateSearchSettings(settings: Settings) {
      await checkAccess("admin.updateSearchSettings");
      await searchConfigurationClient.updateSettings(settings);
    },
    async resetSearchSettings() {
      await checkAccess("admin.resetSearchSettings");
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
