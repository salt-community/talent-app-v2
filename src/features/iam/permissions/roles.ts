import { projects } from "./projects";
import { backgrounds } from "./backgrounds";
import { scores } from "./scores";
import { admins } from "./admins";

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
