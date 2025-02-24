import { JwtPayload } from "jsonwebtoken";
import { createService } from "./service";

type iamService = ReturnType<typeof createService>;

export type CheckAccess = iamService["checkAccess"];
export type ControlUser = iamService["controlUser"];
export type GetCurrentUser = iamService["getCurrentUser"];
export type getAllIdentities = iamService["getAllIdentities"];

export interface SessionClaimsIam extends JwtPayload {
  first_name?: string;
  last_name?: string;
  email?: string | undefined;
}
