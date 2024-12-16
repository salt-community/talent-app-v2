import { db } from "@/db";
import { createAdminService } from "./service";
import { developerService } from "../developer-profiles/instance";

export const adminService = createAdminService(
  db,
  developerService.getAllDeveloperProfiles,
  developerService.deleteDeveloper
);
