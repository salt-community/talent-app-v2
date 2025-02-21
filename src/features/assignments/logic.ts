import { AssignmentScore, CategoryAverages, CategoryScore } from "./types";

export function averageScore(assignmentScores: number[]) {
  const averageScore =
    assignmentScores.length > 0
      ? assignmentScores.reduce((sum, score) => sum + score, 0) /
        assignmentScores.length
      : 0;
  return averageScore;
}

export function averageScoresByCategory(data: CategoryScore[]) {
  const allCategories = [
    "frontend",
    "backend",
    "conversation",
    "team collaboration",
    "design",
    "management",
  ] as const;

  const result = Object.fromEntries(
    allCategories.map((category) => [category, 0])
  ) as CategoryAverages;

  allCategories.forEach((category) => {
    const validScores = data
      .filter(
        (item) =>
          item.score !== null &&
          item.categories !== null &&
          item.categories.includes(category)
      )
      .map((item) => item.score as number);

    if (validScores.length > 0) {
      const sum = validScores.reduce((acc, score) => acc + score, 0);
      result[category] = sum / validScores.length;
    }
  });
  return result;
}
