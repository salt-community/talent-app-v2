import { Settings } from "meilisearch";
import {
  DeveloperProfileService,
  IamService,
  SearchConfigurationClient,
} from "./types";

export function createAdminService(
  developerProfileService: DeveloperProfileService,
  searchConfigurationClient: SearchConfigurationClient,
  iamService: IamService,
  deleteProjectsByDeveloperProfileId: (id: string) => Promise<void>,
) {
  return {
    async getAllIdentities() {
      return iamService.getAllIdentities();
    },
    async deleteDeveloperProfile(id: string) {
      await developerProfileService.delete(id);
    },
    async updateStatus(args: { id: string; status: string }) {
      await developerProfileService.updateDeveloperProfile({ ...args });
    },
    //unused right now
    // async isSearchHealthOk() {
    //   return await searchConfigurationClient.isHealthOk();
    // },
    async repopulateSearch() {
      await searchConfigurationClient.repopulate();
    },
    async ensureSearchIndex() {
      await searchConfigurationClient.ensureSearchIndex();
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
      await iamService.updateRole(args.id, args.newRole);
    },
    async deleteUser(identityId: string) {
      const developerProfiles =
        await developerProfileService.getDeveloperProfileIdById(identityId);
      for (const developerProfile of developerProfiles) {
        await deleteProjectsByDeveloperProfileId(developerProfile.id);
        await developerProfileService.deleteDeveloperProfileFromSearch(
          developerProfile.id,
        );
      }
      await developerProfileService.deleteDeveloperProfileByIdentityId(
        identityId,
      );
      await iamService.deleteIdentity(identityId);
    },
  };
}
