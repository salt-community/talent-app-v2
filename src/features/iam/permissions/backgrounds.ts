import type { BackgroundsService } from "@/features";
import { PermissionsSchema } from "../secure-service";

export const backgrounds: PermissionsSchema<"backgrounds", BackgroundsService> =
  {
    getAllDeveloperProfile: "backgrounds.getAllDeveloperProfile",
    addDeveloperBackground: "backgrounds.addDeveloperBackground",
    add: "backgrounds.add",
    createDeveloperProfile: "backgrounds.createDeveloperProfile",
    deleteDeveloperProfile: "backgrounds.deleteDeveloperProfile",
    doesMeilisearchNeedSync: "backgrounds.doesMeilisearchNeedSync",
    editAccess: "backgrounds.editAccess",
    getAllBackgrounds: "backgrounds.getAllBackgrounds",
    getAllDeveloperProfilesById: "backgrounds.getAllDeveloperProfilesById",
    getAllEducations: "backgrounds.getAllEducations",
    getAllLanguages: "backgrounds.getAllLanguages",
    getAllSkills: "backgrounds.getAllSkills",
    getBackgroundByDeveloperProfileId:
      "backgrounds.getBackgroundByDeveloperProfileId",
    getAllPosts: "backgrounds.getAllPosts",
    getHighlightedDeveloperProfileIds:
      "backgrounds.getHighlightedDeveloperProfileIds",
    getMeilisearchSettings: "backgrounds.getMeilisearchSettings",
    getPostById: "backgrounds.getPostById",
    isSearchHealthOk: "backgrounds.isSearchHealthOk",
    resetMeilisearchSettings: "backgrounds.resetMeilisearchSettings",
    repopulateMeiliSearch: "backgrounds.repopulateMeiliSearch",
    syncMeilisearch: "backgrounds.syncMeilisearch",
    updateMeilisearchSettings: "backgrounds.updateMeilisearchSettings",
    searchDeveloperProfileIds: "backgrounds.searchDeveloperProfileIds",
    update: "backgrounds.update",
  };
