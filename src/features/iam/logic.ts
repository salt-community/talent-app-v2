import { SessionClaimsIam } from "./types";

export function validateSessionClaims(claims: SessionClaimsIam): boolean {
  return Boolean(
    claims?.first_name &&
      claims?.last_name &&
      claims?.email &&
      typeof claims.email === "string"
  );
}
