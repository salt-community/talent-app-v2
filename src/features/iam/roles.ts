import { projects } from "./permissions/projects";
import { backgroundsPermissions } from "./permissions/backgrounds";
import { scores } from "./permissions/scores";
import { admins } from "./permissions/admins";

export const roles = {
  admin: [...backgroundsPermissions, ...scores, ...projects, ...admins],
  developer: [
    backgroundsPermissions[1],
    projects[0],
    projects[1],
    projects[4],
    scores[0],
    scores[1],
  ],
  core: [backgroundsPermissions[0], backgroundsPermissions[1], projects[0]],
} as const;
