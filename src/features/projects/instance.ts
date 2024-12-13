import { db } from "@/db";
import { createService } from "./service";
import { developerService } from "../developer/instance";

export const projectService = createService(
  db,
  developerService.getAllDeveloperProfiles
);
