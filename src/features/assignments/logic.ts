import { CategoryAverage, CategoryScore } from "./types";

export function averageScore(assignmentScores: number[]) {
  const averageScore =
    assignmentScores.length > 0
      ? assignmentScores.reduce((sum, score) => sum + score, 0) /
        assignmentScores.length
      : 0;
  return averageScore;
}

export function averageScoresByCategory(
  data: CategoryScore[]
): CategoryAverage[] {
  const categories = [
    "frontend",
    "backend",
    "conversation",
    "team collaboration",
    "design",
    "management",
  ];

  return categories.map((category) => {
    const validScores = data
      .filter(
        (item) =>
          item.score !== null &&
          item.category !== null &&
          item.category.includes(category)
      )
      .map((item) => item.score as number);

    const averageScore =
      validScores.length > 0
        ? validScores.reduce((acc, score) => acc + score, 0) /
          validScores.length
        : 0;

    return {
      category,
      score: averageScore,
    };
  });
}
