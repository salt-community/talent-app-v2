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
  getHighlightedDevIds: "developerProfiles.getHighlightedDevIds",
  getPublishedOrHighlightedDevIds:
    "developerProfiles.getPublishedOrHighlightedDevIds",
  updateStatus: "developerProfiles.updateStatus",
  getIdentityIdByDeveloperProfileId:
    "developerProfiles.getIdentityIdByDeveloperProfileId",
};
