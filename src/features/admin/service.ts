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
  searchConfigurationClient: SearchConfigurationClient,
  deleteIdentity: (id: string) => Promise<void>,
  deleteDeveloperProfileById: (id: string) => Promise<void>,
  deleteCohortIdentityById: (id: string) => Promise<void>,
  deleteBackgroundById: (id: string) => Promise<void>,
  deleteAssignmentScoreById: (id: string) => Promise<void>,
  deleteProjectsByDeveloperProfileId: (id: string) => Promise<void>
) {
  return {
    async getAllDeveloperProfiles() {
      return await getAllDeveloperProfiles();
    },
    async deleteDeveloperProfile(id: string) {
      await deleteDeveloperProfile(id);
    },
    async updateStatus(args: { id: string; status: string }) {
      await updateStatus({ id: args.id, status: args.status });
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
      return await createAssignment(assignment);
    },
    async deleteUser(identityId: string) {
      console.log("deleting:", identityId);
      await deleteIdentity(identityId);
      await deleteCohortIdentityById(identityId);
      await deleteAssignmentScoreById(identityId);
      const developerProfiles = await getAllDeveloperProfiles();
      const filteredDeveloperProfiles = developerProfiles.filter(
        (developerProfile) =>
          developerProfile.identityId.trim() === identityId.trim()
      );
      for (const developerProfile of filteredDeveloperProfiles) {
        await deleteBackgroundById(developerProfile.id);
        await deleteProjectsByDeveloperProfileId(developerProfile.id);
      }
      await deleteDeveloperProfileById(identityId);
    },
  };
}
