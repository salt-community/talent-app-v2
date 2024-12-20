import { JwtPayload } from "jsonwebtoken";
import { createService } from "./service";

type iamService = ReturnType<typeof createService>;

export type CheckAccess = iamService["checkAccess"];

export interface SessionClaims extends JwtPayload {
  first_name?: string;
  last_name?: string;
  primaryEmail?: string;
}

export type Developer = {
  id: string;
};
