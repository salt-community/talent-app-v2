import { BackgroundsService } from "@/features/developer-profiles";
import { PermissionsSchema } from "../secure-service";

export const backgrounds: PermissionsSchema<"backgrounds", BackgroundsService> =
  {
    addBackground: "backgrounds.addBackground",
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
    updateBackground: "backgrounds.updateBackground",
    deleteBackgroundById: "backgrounds.deleteBackgroundById",
    ensureSearchIndex: "backgrounds.ensureSearchIndex",
  };
