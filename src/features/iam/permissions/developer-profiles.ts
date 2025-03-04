import { DeveloperProfilesService } from "@/features/developer-profiles";
import { PermissionsSchema } from "../secure-service";

export const developerProfiles: PermissionsSchema<
  "developerProfiles",
  DeveloperProfilesService
> = {
  addDeveloperProfile: "developerProfiles.addDeveloperProfile",
  delete: "developerProfiles.delete",
  createDeveloperProfile: "developerProfiles.createDeveloperProfile",
  getAll: "developerProfiles.getAll",
  getAllById: "developerProfiles.getAllById",
  getDeveloperById: "developerProfiles.getDeveloperById",
  updateStatus: "developerProfiles.updateStatus",
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
  searchDeveloperProfileIdsWithLLM:
    "developerProfiles.searchDeveloperProfileIdsWithLLM",
  syncMeilisearch: "developerProfiles.syncMeilisearch",
  updateBackground: "developerProfiles.updateBackground",
  updateMeilisearchSettings: "developerProfiles.updateMeilisearchSettings",
  deleteMeiliSearchDocument: "developerProfiles.deleteMeiliSearchDocument",
  addTempDeveloperProfile: "developerProfiles.addTempDeveloperProfile",
  getHighlightedDeveloperProfileIds:
    "developerProfiles.getHighlightedDeveloperProfileIds",
  addDeveloperProfileDetails: "developerProfiles.addDeveloperProfileDetails",
};
