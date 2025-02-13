import { UnauthorizedError } from "@/lib";
import { rolesPermissions } from "./roles";
import { Permission, Role } from "./permissions";

export function checkAccess(roles: string[], permission: Permission) {
  for (const role of roles) {
    const hasPermission =
      rolesPermissions[role as keyof typeof rolesPermissions].has(permission);

    if (hasPermission) {
      return;
    }
  }

  throw new UnauthorizedError(`Missing permission "${permission}"`);
}
