import { developerService } from "../developer-profiles/instance";

type GetAllDeveloperProfiles = typeof developerService.getAllDeveloperProfiles;
type DeleteDeveloperProfile = typeof developerService.deleteDeveloper;

export function createAdminService(
  getAllDeveloperProfiles: GetAllDeveloperProfiles,
  deleteDeveloperProfile: DeleteDeveloperProfile
) {
  return {
    async getAllDeveloperProfiles() {
      return await getAllDeveloperProfiles();
    },
    async deleteDeveloperProfile(id: string) {
      await deleteDeveloperProfile(id);
    },
  };
}
