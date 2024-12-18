import { db } from "./db";
import { createRepository } from "./repository";
import { createBackgroundsService } from "./service";
import { developerService } from "../developer-profiles";
import { syncBackgroundSearchIndex } from "./meili";

const serviceMethods = {
  syncBackgroundSearchIndex: syncBackgroundSearchIndex,
};

export const backgroundsService = createBackgroundsService(
  createRepository(db),
  serviceMethods,
  developerService.getHighlightedDevIds
);
