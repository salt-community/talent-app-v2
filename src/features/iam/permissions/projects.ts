import type { ProjectsService } from "@/features";
import { PermissionsSchema } from "../secure-service";
import { PagePermissionsSchema } from "./types";

export const projects: PermissionsSchema<"projects", ProjectsService> = {
  add: "projects.add",
  hasCurrentUserAccess: "projects.hasCurrentUserAccess",
  delete: "projects.delete",
  deleteProjectsByDeveloperProfileId:
    "projects.deleteProjectsByDeveloperProfileId",
  getAll: "projects.getAll",
  updateDescription: "projects.updateDescription",
  updateProjectData: "projects.updateProjectData",
};

type ProjectViewPermission = "edit";

type ProjectViewPermissions = Record<ProjectViewPermission, string>;

export const projectPermissions: PagePermissionsSchema<
  "project",
  ProjectViewPermissions
> = {
  edit: "project.edit",
};
