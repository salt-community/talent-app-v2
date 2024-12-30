import { db } from "./db";
import { createRepository } from "./repository";
import { createBackgroundsService } from "./service";
import { developerService } from "../developer-profiles";
import { createMeiliClient } from "./meili";
import { iamService } from "../iam";

export const backgroundsService = createBackgroundsService(
  createRepository(db),
  createMeiliClient(),
  developerService.getStatusById,
  developerService.getHighlightedDevIds,
  developerService.getDeveloperById,
  iamService.checkUserAccess
);
