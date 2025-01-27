import { db } from "./db";
import { createRepository } from "./repository";
import { createBackgroundsService } from "./service";
import { developerProfilesService, secureService } from "@/features";
import { createMeiliClient } from "./meili";
import { iamService } from "@/features";

export const insecureBackgroundsService = createBackgroundsService(
  createRepository(db),
  createMeiliClient(),
  developerProfilesService.getPublishedOrHighlightedDevIds,
  developerProfilesService.getHighlightedDevIds,
  developerProfilesService.getDeveloperById,
  iamService.checkUserAccess,
  developerProfilesService.createDeveloperProfile,
  developerProfilesService.getAllById,
  developerProfilesService.delete,
  developerProfilesService.getIdentityIdByDeveloperProfileId
);

export const backgroundsService = secureService(
  "backgrounds",
  insecureBackgroundsService
);
