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
  generateUniqueSlug: "developerProfiles.generateUniqueSlug",
  deleteByIdentityId: "developerProfiles.deleteByIdentityId",
  updateMissingSlugs: "developerProfiles.updateMissingSlugs",
  getDeveloperProfileByIdentityId:
    "developerProfiles.getDeveloperProfileByIdentityId",
  getCurrentUsers: "developerProfiles.getCurrentUsers",
  isSearchSyncRequired: "developerProfiles.isSearchSyncRequired",
  ensureSearchIndex: "developerProfiles.ensureSearchIndex",
  getAllEducations: "developerProfiles.getAllEducations",
  getAllLanguages: "developerProfiles.getAllLanguages",
  getAllSkills: "developerProfiles.getAllSkills",
  getDeveloperProfileById: "developerProfiles.getDeveloperProfileById",
  geSearchSettings: "developerProfiles.geSearchSettings",
  isSearchHealthOk: "developerProfiles.isSearchHealthOk",
  repopulateSearch: "developerProfiles.repopulateSearch",
  resetSearchSettings: "developerProfiles.resetSearchSettings",
  searchDeveloperProfiles: "developerProfiles.searchDeveloperProfiles",
  searchDeveloperProfilesWithLLM:
    "developerProfiles.searchDeveloperProfilesWithLLM",
  syncSearch: "developerProfiles.syncSearch",
  updateDeveloperProfile: "developerProfiles.updateDeveloperProfile",
  updateSearchSettings: "developerProfiles.updateSearchSettings",
  deleteDeveloperProfileFromSearch:
    "developerProfiles.deleteDeveloperProfileFromSearch",
  addDeveloperProfile: "developerProfiles.addDeveloperProfile",
  getHighlightedDeveloperProfileIds:
    "developerProfiles.getHighlightedDeveloperProfileIds",
  addDeveloperProfileDetails: "developerProfiles.addDeveloperProfileDetails",
  getScoredAssignmentsByIdentityId:
    "developerProfiles.getScoredAssignmentsByIdentityId",
  getAssignmentBySlug: "developerProfiles.getAssignmentBySlug",
  getAverageScoresByIdentityId:
    "developerProfiles.getAverageScoresByIdentityId",
  copyDeveloperProfile: "developerProfiles.copyDeveloperProfile",
  getHighlightedDevelopersProfiles: "developerProfiles.getHighlightedDevelopersProfiles",
  getDevelopersProfilesByIds: "developerProfiles.getDevelopersProfilesByIds",
};
