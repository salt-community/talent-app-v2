import { projects } from "./permissions/projects";
import { backgrounds } from "./permissions/backgrounds";
import { scores } from "./permissions/scores";
import { admins } from "./permissions/admins";

export const roles = {
  admin: [...backgrounds, ...scores, ...projects, ...admins],
  developer: [
    backgrounds[1],
    projects[0],
    projects[1],
    projects[4],
    scores[0],
    scores[1],
  ],
  core: [backgrounds[0], backgrounds[1], projects[0]],
} as const;

export type Role = keyof typeof roles;
export type Permission = (typeof roles)[Role][number];
