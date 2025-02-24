import { DeleteDeveloperProfile, UpdateStatus } from "@/features";
import { Settings } from "meilisearch";
import { Identity, SearchConfigurationClient } from "./types";
import { IamClient } from "../iam/permissions";

export function createAdminService(
  deleteDeveloperProfile: DeleteDeveloperProfile,
  updateStatus: UpdateStatus,
  searchConfigurationClient: SearchConfigurationClient,
  iamClient: IamClient,
  deleteDeveloperProfileById: (id: string) => Promise<void>,
  deleteBackgroundById: (id: string) => Promise<void>,
  deleteProjectsByDeveloperProfileId: (id: string) => Promise<void>,
  getDeveloperProfileIdById: (id: string) => Promise<{ id: string }[]>
) {
  return {
    async getAllIdentities() {
      return iamClient.getAllIdentities();
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
      await iamClient.updateRole(args.id, args.newRole);
    },
    async deleteUser(identityId: string) {
      // await deleteCohortIdentityById(identityId);
      const developerProfiles = await getDeveloperProfileIdById(identityId);
      for (const developerProfile of developerProfiles) {
        await deleteBackgroundById(developerProfile.id);
        await deleteProjectsByDeveloperProfileId(developerProfile.id);
      }
      await deleteDeveloperProfileById(identityId);
      await iamClient.deleteIdentity(identityId);
    },
  };
}
