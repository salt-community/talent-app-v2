import { db } from "@/db";
import { createService } from "./service";
import { backgroundsService } from "@/features";
import { developerService } from "@/features/developer-profiles/instance";
export const iamService = createService(
  db,
  developerService.add,
  backgroundsService.add
);
