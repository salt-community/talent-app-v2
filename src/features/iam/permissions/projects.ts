import type { ProjectsService } from "@/features";
import { PermissionsSchema } from "../secure-service";
import { PagePermissionsSchema } from "./types";

export const projects: PermissionsSchema<"projects", ProjectsService> = {
  add: "projects.add",
  delete: "projects.delete",
  getAll: "projects.getAll",
  getAllDevelopers: "projects.getAllDevelopers",
  updateDescription: "projects.updateDescription",
  updateProjectData: "projects.updateProjectData",
  hasAccess: "projects.hasAccess",
};

type ProjectViewPermission = "edit";

type ProjectViewPermissions = Record<ProjectViewPermission, string>;

export const projectPermissions: PagePermissionsSchema<
  "project",
  ProjectViewPermissions
> = {
  edit: "project.edit",
};
