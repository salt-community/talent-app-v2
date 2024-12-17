import { createAdminService } from "./service";
import { developerService, iamService } from "@/features";

export const adminService = createAdminService(
  developerService.getAll,
  developerService.delete,
  developerService.updateStatus,
  iamService.checkAccess
);
