import { db } from "./db";
import { createRepository } from "./repository";
import { createBackgroundsService } from "./service";
import { developerService, secureService } from "@/features";
import { createMeiliClient } from "./meili";
import { iamService } from "@/features";

const insecureBackgroundsService = createBackgroundsService(
  createRepository(db),
  createMeiliClient(),
  developerService.getPublishedOrHighlightedDevIds,
  developerService.getHighlightedDevIds,
  developerService.getDeveloperById,
  iamService.checkUserAccess,
  developerService.createDeveloperProfile,
  developerService.getAllById,
  developerService.delete
);

export const backgroundsService = secureService(
  "backgrounds",
  insecureBackgroundsService
);
