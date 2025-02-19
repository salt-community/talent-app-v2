import { UnauthorizedError } from "@/lib";
import { rolesPermissions, rolesViewPermissions } from "./roles";

export function checkAccess(roles: string[], permission: string) {
  for (const role of roles) {
    // note: role as keyof typeof rolesPermissions is unsafe code
    const rolePermission = rolesPermissions[
      role as keyof typeof rolesPermissions
    ] as Set<string>;
    if (!rolePermission) {
      throw new UnauthorizedError(`Invalid role: "${role}"`);
    }

    const hasPermission = rolePermission.has(permission);

    if (hasPermission) {
      return;
    }
  }

  throw new UnauthorizedError(`Missing permission "${permission}"`);
}

export function hasAccess(roles: string[], permission: string) {
  for (const role of roles) {
    const rolePermission = rolesViewPermissions[
      role as keyof typeof rolesViewPermissions
    ] as Set<string>;
    if (!rolePermission) {
      return false;
    }

    const hasPermission = rolePermission.has(permission);

    if (hasPermission) {
      return true;
    }
  }

  return false;
}
