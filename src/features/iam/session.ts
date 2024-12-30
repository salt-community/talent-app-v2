import { validateSessionClaims } from "./logic";
import { SessionClaimsIam } from "./types";

export function claim(claims: SessionClaimsIam) {
  if (!validateSessionClaims(claims)) {
    return { name: "", domain: "", email: "" };
  }

  const { first_name, last_name, email } = claims;
  const name = `${first_name} ${last_name}`;
  const domain = email?.split("@")[1];
  return { name, email, domain };
}
