import type { Assignment } from "./types";

export function calculateAverageCategoryScore(
  assignments: Assignment[],
  category: string
): number {
  const filtered = assignments.filter((a) => (a.tags ?? []).includes(category));
  if (filtered.length === 0) return 0;

  const sum = filtered.reduce((acc, curr) => acc + (curr.score ?? 0), 0);
  return Math.round(sum / filtered.length);
}
