import {
  DeleteDeveloperProfile,
  UpdateStatus,
  CreateAssignment,
  NewAssignment,
  GetAllCohorts,
  GetAllAssignments,
} from "@/features";
import { Identity, SearchConfigurationClient } from "./types";
import { Settings } from "meilisearch";

export function createAdminService(
  deleteDeveloperProfile: DeleteDeveloperProfile,
  updateStatus: UpdateStatus,
  createAssignment: CreateAssignment,
  getAllAssignments: GetAllAssignments,
  getAllCohorts: GetAllCohorts,
  searchConfigurationClient: SearchConfigurationClient,
  updateRole: (id: string, newRole: string) => Promise<void>,
  getAllIdentities: () => Promise<Identity[]>,
  deleteIdentity: (id: string) => Promise<void>,
  deleteDeveloperProfileById: (id: string) => Promise<void>,
  deleteCohortIdentityById: (id: string) => Promise<void>,
  deleteBackgroundById: (id: string) => Promise<void>,
  deleteAssignmentScoreById: (id: string) => Promise<void>,
  deleteProjectsByDeveloperProfileId: (id: string) => Promise<void>,
  getDeveloperProfileIdById: (id: string) => Promise<{ id: string }[]>
) {
  return {
    async getAllIdentities() {
      return getAllIdentities();
    },
    async deleteDeveloperProfile(id: string) {
      await deleteDeveloperProfile(id);
    },
    async updateStatus(args: { id: string; status: string }) {
      await updateStatus({ id: args.id, status: args.status });
    },
    //unused right now
    // async isSearchHealthOk() {
    //   return await searchConfigurationClient.isHealthOk();
    // },
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
    async updateRole(args: { id: string; newRole: string }) {
      await updateRole(args.id, args.newRole);
    },
    //Ali - check if this is needed
    async getAllAssignments() {
      return await getAllAssignments();
    },
    //Ali - check if this is needed
    async getAllCohorts() {
      return await getAllCohorts();
    },
    //Ali - check if this is needed
    async createAssignment(assignment: NewAssignment) {
      return await createAssignment(assignment);
    },
    async deleteUser(identityId: string) {
      await deleteCohortIdentityById(identityId);
      const developerProfiles = await getDeveloperProfileIdById(identityId);
      for (const developerProfile of developerProfiles) {
        await deleteBackgroundById(developerProfile.id);
        await deleteProjectsByDeveloperProfileId(developerProfile.id);
      }
      await deleteDeveloperProfileById(identityId);
      await deleteIdentity(identityId);
    },
  };
}
