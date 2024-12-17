import { createAdminService } from "./service";
import { developerService } from "../developer-profiles/instance";

export const adminService = createAdminService(
  developerService.getAll,
  developerService.delete,
  developerService.updateStatus,
);
