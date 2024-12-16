import { db } from "@/db";
import { createAdminService } from "./service";
import { developerService } from "../developer-profiles/instance";

export const adminService = createAdminService(
  developerService.getAllDeveloperProfiles,
  developerService.deleteDeveloper
);
