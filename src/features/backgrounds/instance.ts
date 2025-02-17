import { createRepository } from "./repository";
import { createBackgroundsService } from "./service";
import { developerProfilesService, secureService } from "@/features";
import { createMeiliClient } from "./meili";
import { db } from "@/db";

export const insecureBackgroundsService = createBackgroundsService(
  createRepository(db),
  createMeiliClient(),
  developerProfilesService.getPublishedOrHighlightedDeveloperProfileIds,
  developerProfilesService.getHighlightedDeveloperProfileIds,
  developerProfilesService.getDeveloperById,
  developerProfilesService.createDeveloperProfile,
  developerProfilesService.getAllById,
  developerProfilesService.delete
);

export const backgroundsService = secureService(
  "backgrounds",
  insecureBackgroundsService
);
