import { createRepository } from "./repository";
import { createBackgroundsService } from "./service";
import { secureService } from "@/features";
import { createBackgroundsSearchApi } from "./backgrounds-search";
import { db } from "@/db";

export const insecureBackgroundsService = createBackgroundsService(
  createRepository(db),
  createBackgroundsSearchApi()
);

export const backgroundsService = secureService(
  "backgrounds",
  insecureBackgroundsService
);
