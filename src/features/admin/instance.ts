import { db } from "@/db";
import { createAdminService } from "./service";
import { developerService } from "../developer-profiles/instance";
import { iamService } from "../iam/instance";

export const adminService = createAdminService(
  db,
  developerService.getAllDeveloperProfiles,
  iamService.hasAccess
);
