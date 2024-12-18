import { db } from "@/db";
import { createService } from "./service";
import { backgroundsService, developerService } from "@/features";

export const iamService = createService(
  db,
  developerService.add,
  developerService.getById,
  backgroundsService.add
);
