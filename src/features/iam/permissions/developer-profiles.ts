import { DeveloperProfilesService } from "@/features/developer-profiles";
import { PermissionsSchema } from "../secure-service";

export const developerProfiles: PermissionsSchema<
  "developerProfiles",
  DeveloperProfilesService
> = {
  add: "developerProfiles.add",
  delete: "developerProfiles.delete",
  createDeveloperProfile: "developerProfiles.createDeveloperProfile",
  getAll: "developerProfiles.getAll",
  getAllById: "developerProfiles.getAllById",
  getById: "developerProfiles.getById",
  getDeveloperById: "developerProfiles.getDeveloperById",
  getHighlightedDeveloperProfileIds:
    "developerProfiles.getHighlightedDeveloperProfileIds",
  getPublishedOrHighlightedDeveloperProfileIds:
    "developerProfiles.getPublishedOrHighlightedDeveloperProfileIds",
  updateStatus: "developerProfiles.updateStatus",
  getIdentityIdByDeveloperProfileId:
    "developerProfiles.getIdentityIdByDeveloperProfileId",
  generateUniqueSlug: "developerProfiles.generateUniqueSlug",
  deleteByIdentityId: "developerProfiles.deleteByIdentityId",
  updateMissingSlugs: "developerProfiles.updateMissingSlugs",
  getDeveloperProfileByIdentityId:
    "developerProfiles.getDeveloperProfileByIdentityId",
};
