import { createRepository } from "./repository";
import { createBackgroundsService } from "./service";
import { developerProfilesService, secureService } from "@/features";
import { createMeiliClient } from "./meili";
import { iamService } from "@/features";
import { db } from "@/db";

export const insecureBackgroundsService = createBackgroundsService(
  createRepository(db),
  createMeiliClient(),
  developerProfilesService.getPublishedOrHighlightedDeveloperProfileIds,
  developerProfilesService.getDeveloperById,
  developerProfilesService.getAll,
  developerProfilesService.createDeveloperProfile,
  developerProfilesService.getAllById,
  developerProfilesService.delete,
  developerProfilesService.getDeveloperProfileByIdentityId,
  iamService.getCurrentUser
);

export const backgroundsService = secureService(
  "backgrounds",
  insecureBackgroundsService
);
