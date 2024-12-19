import { SessionClaims } from "./types";

export function validateSessionClaims(claims: SessionClaims): boolean {
  return Boolean(
    claims?.first_name &&
      claims?.last_name &&
      claims?.email &&
      typeof claims.email === "string"
  );
}
