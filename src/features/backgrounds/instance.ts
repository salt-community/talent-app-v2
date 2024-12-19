import { db } from "./db";
import { createRepository } from "./repository";
import { createBackgroundsService } from "./service";
import { developerService } from "../developer-profiles";
import { createMeiliClient } from "./meili";

export const backgroundsService = createBackgroundsService(
  createRepository(db),
  createMeiliClient(),
  developerService.getHighlightedDevIds,
);
