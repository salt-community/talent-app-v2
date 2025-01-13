import { UnauthorizedError } from "@/lib";
import { Permission, Role, ROLES } from "./roles";

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
