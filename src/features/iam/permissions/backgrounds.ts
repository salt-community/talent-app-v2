import type { BackgroundsService } from "@/features";
import { PermissionsSchema } from "../secure-service";

export const backgrounds: PermissionsSchema<"backgrounds", BackgroundsService> =
  {
    getAllDeveloperProfile: "backgrounds.getAllDeveloperProfile",
    addDeveloperBackground: "backgrounds.addDeveloperBackground",
    add: "backgrounds.add",
    doesMeilisearchNeedSync: "backgrounds.doesMeilisearchNeedSync",
    getAllEducations: "backgrounds.getAllEducations",
    getAllLanguages: "backgrounds.getAllLanguages",
    getAllSkills: "backgrounds.getAllSkills",
    getBackgroundByDeveloperProfileId:
      "backgrounds.getBackgroundByDeveloperProfileId",
    getMeilisearchSettings: "backgrounds.getMeilisearchSettings",
    isSearchHealthOk: "backgrounds.isSearchHealthOk",
    resetMeilisearchSettings: "backgrounds.resetMeilisearchSettings",
    repopulateMeiliSearch: "backgrounds.repopulateMeiliSearch",
    syncMeilisearch: "backgrounds.syncMeilisearch",
    updateMeilisearchSettings: "backgrounds.updateMeilisearchSettings",
    searchDeveloperProfileIds: "backgrounds.searchDeveloperProfileIds",
    update: "backgrounds.update",
    deleteBackgroundById: "backgrounds.deleteBackgroundById",
  };
