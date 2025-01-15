import type { ProjectsService } from "@/features";
import { PermissionsSchema } from "../secure-service";

export const projects: PermissionsSchema<"projects", ProjectsService> = {
  add: "projects.add",
  checkProfileAccess: "projects.checkProfileAccess",
  delete: "projects.delete",
  getAll: "projects.getAll",
  getAllDevelopers: "projects.getAllDevelopers",
  updateDescription: "projects.updateDescription",
  updatePerformance: "projects.updatePerformance",
};
