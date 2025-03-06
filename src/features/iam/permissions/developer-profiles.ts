import { DeveloperProfilesService } from "@/features/developer-profiles";
import { PermissionsSchema } from "../secure-service";

export const developerProfiles: PermissionsSchema<
  "developerProfiles",
  DeveloperProfilesService
> = {
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
  doesMeilisearchNeedSync: "developerProfiles.doesMeilisearchNeedSync",
  ensureSearchIndex: "developerProfiles.ensureSearchIndex",
  getAllEducations: "developerProfiles.getAllEducations",
  getAllLanguages: "developerProfiles.getAllLanguages",
  getAllSkills: "developerProfiles.getAllSkills",
  getDeveloperProfileById: "developerProfiles.getDeveloperProfileById",
  getMeilisearchSettings: "developerProfiles.getMeilisearchSettings",
  isSearchHealthOk: "developerProfiles.isSearchHealthOk",
  repopulateMeiliSearch: "developerProfiles.repopulateMeiliSearch",
  resetMeilisearchSettings: "developerProfiles.resetMeilisearchSettings",
  searchDeveloperProfileIds: "developerProfiles.searchDeveloperProfileIds",
  searchDeveloperProfileIdsWithLLM:
    "developerProfiles.searchDeveloperProfileIdsWithLLM",
  syncMeilisearch: "developerProfiles.syncMeilisearch",
  updateDeveloperProfile: "developerProfiles.updateDeveloperProfile",
  updateMeilisearchSettings: "developerProfiles.updateMeilisearchSettings",
  deleteMeiliSearchDocument: "developerProfiles.deleteMeiliSearchDocument",
  addDeveloperProfile: "developerProfiles.addDeveloperProfile",
  getHighlightedDeveloperProfileIds:
    "developerProfiles.getHighlightedDeveloperProfileIds",
  addDeveloperProfileDetails: "developerProfiles.addDeveloperProfileDetails",
  getScoredAssignmentsByIdentityId:
    "developerProfiles.getScoredAssignmentsByIdentityId",
  getAssignmentBySlug: "developerProfiles.getAssignmentBySlug",
};
