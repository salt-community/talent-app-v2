import { rolesPermissions, rolesViewPermissions } from "../roles";

export type Role = keyof typeof rolesPermissions;
export type PermissionSets = (typeof rolesPermissions)[Role];
export type Permission = PermissionSets extends Set<infer U> ? U : never;

export type ViewRole = keyof typeof rolesViewPermissions;
export type ViewPermissionSets = (typeof rolesViewPermissions)[ViewRole];
export type ViewPermission =
  ViewPermissionSets extends Set<infer U> ? U : never;

type PermissionService = {
  [key: string]: string;
};

export type PagePermissionsSchema<
  TPageName extends string,
  TPermissions extends PermissionService,
> = {
  [K in keyof TPermissions]: `${TPageName}.${K extends string ? K : never}`;
};
