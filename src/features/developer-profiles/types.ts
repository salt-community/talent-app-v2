import { createDeveloperService } from "./service";

type DevelopersService = ReturnType<typeof createDeveloperService>;

export type GetAllDeveloperProfiles =
  DevelopersService["getAllDeveloperProfiles"];

export type DeleteDeveloperProfile = DevelopersService["deleteDeveloper"];
