import { db } from "@/db";
import { createService } from "./service";
import { developerService } from "../developer-profiles/instance";
import { iamService } from "@/features";

export const projectService = createService(
  db,
  developerService.getAll,
  iamService.checkAccess
);
