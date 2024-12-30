import { JwtPayload } from "jsonwebtoken";
import { createService } from "./service";

type iamService = ReturnType<typeof createService>;

export type CheckAccess = iamService["checkAccess"];
export interface SessionClaimsIam extends JwtPayload {
  first_name?: string;
  last_name?: string;
  email?: string | undefined;
}
export const identityRole = ["admin", "core", "developer"] as const;

export type IdentityRole = (typeof identityRole)[number];
