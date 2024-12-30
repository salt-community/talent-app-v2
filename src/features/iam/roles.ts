import { projects } from "./permissions/projects";
import { backgrounds } from "./permissions/backgrounds";
import { scores } from "./permissions/scores";
import { admins } from "./permissions/admins";

export const ROLES = {
  admin: [...backgrounds, ...scores, ...projects, ...admins],
  developer: [backgrounds[1], projects[0], scores[1]],
  core: [],
} as const;
