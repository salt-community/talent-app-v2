import { db } from "@/db";
import { createService } from "./service";
import { developerService } from "../developer-profiles/instance";
import { iamService } from "@/features";

export const projectService = createService(
  db,
  developerService.getAll,
  iamService.checkAccess,
  iamService.checkUserAccess
);

export const seedProjectService = createService(
  db,
  developerService.getAll,
  async function checkAccess(): Promise<void> {},
  async function checkUserAccess(): Promise<boolean> {
    return true;
  }
);
