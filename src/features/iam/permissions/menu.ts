import { PagePermissionsSchema } from "./types";

type MenuViewPermission = "profile" | "admin" | "instructorsDashboard";

type MenuViewPermissions = Record<MenuViewPermission, string>;

export const MenuPermissions: PagePermissionsSchema<
  "menu",
  MenuViewPermissions
> = {
  profile: "menu.profile",
  admin: "menu.admin",
  instructorsDashboard: "menu.instructorsDashboard",
};
