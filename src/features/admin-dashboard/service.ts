import { Settings } from "meilisearch";
import {
  DeveloperProfileClient,
  IamClient,
  SearchConfigurationClient,
} from "./types";

export function createAdminService(
  developerProfileClient: DeveloperProfileClient,
  searchConfigurationClient: SearchConfigurationClient,
  iamClient: IamClient,
  deleteBackgroundById: (id: string) => Promise<void>,
  deleteProjectsByDeveloperProfileId: (id: string) => Promise<void>
) {
  return {
    async getAllIdentities() {
      return iamClient.getAllIdentities();
    },
    async deleteDeveloperProfile(id: string) {
      await developerProfileClient.delete(id);
    },
    async updateStatus(args: { id: string; status: string }) {
      await developerProfileClient.updateStatus({
        id: args.id,
        status: args.status,
      });
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
      const developerProfiles =
        await developerProfileClient.getDeveloperProfileIdById(identityId);
      for (const developerProfile of developerProfiles) {
        await deleteBackgroundById(developerProfile.id);
        await deleteProjectsByDeveloperProfileId(developerProfile.id);
      }
      await developerProfileClient.deleteDeveloperProfileByIdentityId(
        identityId
      );
      await iamClient.deleteIdentity(identityId);
    },
  };
}
