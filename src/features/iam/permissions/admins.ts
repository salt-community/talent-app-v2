// TODO: Remove as the admin-dashboard is just an aggregation of the other features.

export const admins = [
  "admins.isSearchHealthOk",
  "admins.getAllDeveloperProfiles",
  "admins.deleteDeveloperProfile",
  "admins.updateStatus",
  "admins.repopulateSearch",
  "admins.syncSearch",
  "admins.doesSearchNeedSync",
  "admins.getSearchSettings",
  "admins.updateSearchSettings",
  "admins.resetSearchSettings",
  "admins.deleteUser",
] as const;
