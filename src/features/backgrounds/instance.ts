import { createRepository } from "./repository";
import { createBackgroundsService } from "./service";
import { getDeveloperProfilesService, secureService } from "@/features";
import { createMeiliClient } from "./meili";
import { db } from "@/db";

const developerProfilesService = getDeveloperProfilesService();

export const insecureBackgroundsService = createBackgroundsService(
  createRepository(db),
  createMeiliClient(),
  developerProfilesService.getPublishedOrHighlightedDeveloperProfileIds
);

export const backgroundsService = secureService(
  "backgrounds",
  insecureBackgroundsService
);
