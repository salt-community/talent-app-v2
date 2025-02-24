// TODO: Remove as the admin-dashboard is just an aggregation of the other features.

import { AdminsService } from "@/features/admin-dashboard/types";
import { PermissionsSchema } from "../secure-service";

export const admins: PermissionsSchema<"admins", AdminsService> = {
  // unused isSearchHealthOk: "admins.isSearchHealthOk",
  deleteDeveloperProfile: "admins.deleteDeveloperProfile",
  deleteUser: "admins.deleteUser",
  doesSearchNeedSync: "admins.doesSearchNeedSync",
  getAllIdentities: "admins.getAllIdentities",
  getSearchSettings: "admins.getSearchSettings",
  repopulateSearch: "admins.repopulateSearch",
  syncSearch: "admins.syncSearch",
  updateRole: "admins.updateRole",
  updateSearchSettings: "admins.updateSearchSettings",
  updateStatus: "admins.updateStatus",
};
