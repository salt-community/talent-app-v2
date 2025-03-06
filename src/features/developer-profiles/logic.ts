import { SessionClaims } from "./types";

export function validateSessionClaims(claims: SessionClaims): boolean {
  return Boolean(
    claims?.first_name &&
      claims?.last_name &&
      claims?.email &&
      typeof claims.email === "string"
  );
}

export function generateSlug(title: string) {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[åä]/g, "a")
    .replace(/ö/g, "o")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/-+/g, "-")
    .trim();
}
