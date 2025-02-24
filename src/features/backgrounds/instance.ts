import { createRepository } from "./repository";
import { createBackgroundsService } from "./service";
import { getDeveloperProfilesService, secureService } from "@/features";
import { createMeiliClient } from "./meili";
import { db } from "@/db";

export const insecureBackgroundsService = createBackgroundsService(
  createRepository(db),
  createMeiliClient()
);

export const backgroundsService = secureService(
  "backgrounds",
  insecureBackgroundsService
);
