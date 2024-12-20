import { validateSessionClaims } from "./logic";
import { SessionClaims } from "./types";

export function claim(claims: SessionClaims) {
  if (!validateSessionClaims(claims)) {
    return { name: "", domain: "" };
  }

  const { first_name, last_name, email } = claims;
  const name = `${first_name} ${last_name}`;
  const domain = email?.split("@")[1];
  return { name, email, domain };
}
