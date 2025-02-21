import { createRepository } from "./repository";
import { createBackgroundsService } from "./service";
import { getDeveloperProfilesService, secureService } from "@/features";
import { createMeiliClient } from "./meili";
import { db } from "@/db";

const developerProfilesService = getDeveloperProfilesService();

export const insecureBackgroundsService = createBackgroundsService(
  createRepository(db),
  createMeiliClient(),
  developerProfilesService.getPublishedOrHighlightedDeveloperProfileIds,
  developerProfilesService.getDeveloperById,
  developerProfilesService.getAll,
  developerProfilesService.createDeveloperProfile,
  developerProfilesService.getAllById,
  developerProfilesService.delete
);

export const backgroundsService = secureService(
  "backgrounds",
  insecureBackgroundsService
);
