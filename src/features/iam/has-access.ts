import { ROLES } from "./roles";

type Role = keyof typeof ROLES;
type Permission = (typeof ROLES)[Role][number];

export function hasAccess(
  user: { id: string; roles: Role },
  permission: Permission
): boolean {
  return (ROLES[user.roles] as readonly Permission[]).includes(permission);
}
