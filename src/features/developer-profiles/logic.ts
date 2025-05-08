import { Experience, SessionClaims } from "./types";

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
export function validateEducationOrder(
  experiences: Experience[]
): Experience[] {
  if (
    experiences.some((exp) => exp.order === 0) ||
    needsReordering(experiences)
  ) {
    return [...experiences].map((exp, index) => ({
      ...exp,
      order: index + 1,
    }));
  }
  return experiences;
}

function needsReordering(experiences: Experience[]): boolean {
  const sortedExperiences = [...experiences].sort((a, b) => a.order - b.order);
  return sortedExperiences.some((exp, index) => exp.order !== index + 1);
}
