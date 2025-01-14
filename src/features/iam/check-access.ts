import { UnauthorizedError } from "@/lib";
import { Permission, Role, roles } from "./permissions";

export function checkAccess(
  user: { id: string; roles: Role },
  permission: Permission
) {
  const hasAccess = (roles[user.roles] as readonly Permission[]).includes(
    permission
  );
  if (!hasAccess) {
    throw new UnauthorizedError("You do not have permission");
  }
}
