import { JwtPayload } from "jsonwebtoken";
import { createService } from "./service";

type iamService = ReturnType<typeof createService>;

export type CheckAccess = iamService["checkAccess"];
export type CreateDeveloperProfile = iamService["createDeveloperProfile"];

export interface SessionClaims extends JwtPayload {
  first_name?: string;
  last_name?: string;
  email?: string | undefined;
}

export type Developer = {
  id: string;
};

export const identityRole = ["admin", "core", "developer"] as const;

export type IdentityRole = (typeof identityRole)[number];
