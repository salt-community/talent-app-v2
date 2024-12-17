import { createDevelopersService } from "./service";

type DevelopersService = ReturnType<typeof createDevelopersService>;

export type GetAllDeveloperProfiles = DevelopersService["getAll"];
export type DeleteDeveloperProfile = DevelopersService["delete"];
export type UpdateStatus = DevelopersService["updateStatus"];

export const developerProfileStatus = [
  "unpublished",
  "published",
  "highlighted",
] as const;

export type DeveloperProfileStatus = (typeof developerProfileStatus)[number];
