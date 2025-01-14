export const backgroundsPermissions = [
  "backgrounds.getAll",
  "backgrounds.getById",
  "backgrounds.add",
  "backgrounds.update",
  "backgrounds.delete",
] as const;

export type BackgroundsPermission = (typeof backgroundsPermissions)[number];
