// TODO: Remove as the admin-dashboard is just an aggregation of the other features.

import { AdminsService } from "@/features/admin/types";
import { PermissionsSchema } from "../secure-service";

export const admins: PermissionsSchema<"admins", AdminsService> = {
  isSearchHealthOk: "admins.isSearchHealthOk",
  createAssignment: "admins.createAssignment",
  deleteDeveloperProfile: "admins.deleteDeveloperProfile",
  deleteUser: "admins.deleteUser",
  doesSearchNeedSync: "admins.doesSearchNeedSync",
  getAllAssignments: "admins.getAllAssignments",
  getAllCohorts: "admins.getAllCohorts",
  getAllIdentities: "admins.getAllIdentities",
  getSearchSettings: "admins.getSearchSettings",
  repopulateSearch: "admins.repopulateSearch",
  resetSearchSettings: "admins.resetSearchSettings",
  syncSearch: "admins.syncSearch",
  updateRole: "admins.updateRole",
  updateSearchSettings: "admins.updateSearchSettings",
  updateStatus: "admins.updateStatus",
};
