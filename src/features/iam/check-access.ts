import { UnauthorizedError } from "@/lib";
import { ROLES } from "./roles";
type Role = keyof typeof ROLES;
type Permission = (typeof ROLES)[Role][number];

export function checkAccess(
  user: { id: string; roles: Role },
  permission: Permission
) {
  const hasAccess = (ROLES[user.roles] as readonly Permission[]).includes(
    permission
  );
  if (!hasAccess) {
    throw new UnauthorizedError("You do not have permission");
  }
}
