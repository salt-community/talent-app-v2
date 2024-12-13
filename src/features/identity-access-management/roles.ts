export const ROLES = {
  admin: [
    "view:developerProfile",
    "create:developerProfile",
    "update:developerProfile",
    "delete:developerProfile",
  ],
  developer: ["view:developerProfile"],
  core: ["view:developerProfile", "update:developerProfile"],
} as const;
