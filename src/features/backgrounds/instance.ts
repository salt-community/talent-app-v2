import { db } from "./db";
import { createRepository } from "./repository";
import { createBackgroundsService } from "./service";
import { developerService } from "@/features";
import { createMeiliClient } from "./meili";
import { iamService } from "@/features";

export const backgroundsService = createBackgroundsService(
  createRepository(db),
  createMeiliClient(),
  developerService.getStatusById,
  developerService.getHighlightedDevIds,
  developerService.getDeveloperById,
  iamService.checkUserAccess,
  developerService.createDeveloperProfile,
  developerService.getAllById
);
