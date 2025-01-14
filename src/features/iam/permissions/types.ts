import { rolesPermissions } from "../roles";

export type Role = keyof typeof rolesPermissions;
export type PermissionSets = (typeof rolesPermissions)[Role];
export type Permission = PermissionSets extends Set<infer U> ? U : never;
