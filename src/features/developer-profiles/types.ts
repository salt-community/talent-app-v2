import { createDevelopersService } from "./service";
import { JwtPayload } from "jsonwebtoken";

type DevelopersService = ReturnType<typeof createDevelopersService>;

export type GetAllDeveloperProfiles = DevelopersService["getAll"];
export type DeleteDeveloperProfile = DevelopersService["delete"];
export type UpdateStatus = DevelopersService["updateStatus"];
export type GetAllById = DevelopersService["getAllById"];

export type Developer = {
  name: string;
  id: string;
  identityId: string | null;
  email: string;
  status: "unpublished" | "published" | "highlighted";
};

export const developerProfileStatus = [
  "unpublished",
  "published",
  "highlighted",
] as const;

export type DeveloperProfileStatus = (typeof developerProfileStatus)[number];

export interface SessionClaims extends JwtPayload {
  first_name?: string;
  last_name?: string;
  email?: string | undefined;
}
