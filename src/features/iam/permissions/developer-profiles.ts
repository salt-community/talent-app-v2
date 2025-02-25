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
  getCurrentUsers: "developerProfiles.getCurrentUsers",
  addBackground: "developerProfiles.addBackground",
  deleteBackgroundById: "developerProfiles.deleteBackgroundById",
  doesMeilisearchNeedSync: "developerProfiles.doesMeilisearchNeedSync",
  ensureSearchIndex: "developerProfiles.ensureSearchIndex",
  getAllEducations: "developerProfiles.getAllEducations",
  getAllLanguages: "developerProfiles.getAllLanguages",
  getAllSkills: "developerProfiles.getAllSkills",
  getBackgroundByDeveloperProfileId:
    "developerProfiles.getBackgroundByDeveloperProfileId",
  getMeilisearchSettings: "developerProfiles.getMeilisearchSettings",
  isSearchHealthOk: "developerProfiles.isSearchHealthOk",
  repopulateMeiliSearch: "developerProfiles.repopulateMeiliSearch",
  resetMeilisearchSettings: "developerProfiles.resetMeilisearchSettings",
  searchDeveloperProfileIds: "developerProfiles.searchDeveloperProfileIds",
  syncMeilisearch: "developerProfiles.syncMeilisearch",
  updateBackground: "developerProfiles.updateBackground",
  updateMeilisearchSettings: "developerProfiles.updateMeilisearchSettings",
};
