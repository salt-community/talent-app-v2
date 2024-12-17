import { createAdminService } from "./service";
import { developerService } from "../developer-profiles/instance";
import { iamService } from "../iam/instance";

export const adminService = createAdminService(
  developerService.getAll,
  developerService.delete,
  developerService.updateStatus,
  iamService.checkAccess
);
