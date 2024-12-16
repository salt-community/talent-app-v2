import { createDevelopersService } from "./service";

type DevelopersService = ReturnType<typeof createDevelopersService>;

export type GetAllDeveloperProfiles = DevelopersService["getAll"];

export type DeleteDeveloperProfile = DevelopersService["delete"];
