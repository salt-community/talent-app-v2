import { createDeveloperProfilesService } from "./service";
import { JwtPayload } from "jsonwebtoken";

type DevelopersService = ReturnType<typeof createDeveloperProfilesService>;

export type GetAllDeveloperProfiles = DevelopersService["getAll"];
export type DeleteDeveloperProfile = DevelopersService["delete"];
export type UpdateStatus = DevelopersService["updateStatus"];
export type GetAllById = DevelopersService["getAllById"];
export type CreateDeveloperProfile =
  DevelopersService["createDeveloperProfile"];

export type Developer = {
  name: string;
  id: string;
  identityId: string | null;
  email: string;
  status: string;
};

export interface SessionClaims extends JwtPayload {
  first_name?: string;
  last_name?: string;
  email?: string | undefined;
}
