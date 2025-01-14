import { UnauthorizedError } from "@/lib";
import { roles } from "./roles";
import { Permission, Role } from "./permissions";

export function checkAccess(
  user: { id: string; roles: Role },
  permission: Permission
) {
  const hasAccess = (roles[user.roles] as readonly Permission[]).includes(
    permission
  );
  if (!hasAccess) {
    throw new UnauthorizedError(`Missing permission "${permission}"`);
  }
}
