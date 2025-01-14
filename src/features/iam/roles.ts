import {
  scores,
  projects,
  admins,
  backgroundsPermissionsObject,
} from "./permissions";

export const rolesPermissions = {
  guest: new Set([backgroundsPermissionsObject.getBackgroundByDevId]),
  admin: new Set([
    ...Object.values(backgroundsPermissionsObject),
    ...scores,
    ...projects,
    ...admins,
  ]),
  developer: new Set([
    projects[0],
    projects[1],
    projects[4],
    scores[0],
    scores[1],
  ]),
  core: new Set([projects[0]]),
} as const;
