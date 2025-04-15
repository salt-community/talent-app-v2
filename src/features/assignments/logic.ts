export function averageScore(assignmentScores: number[]) {
  const averageScore =
    assignmentScores.length > 0
      ? assignmentScores.reduce((sum, score) => sum + score, 0) /
        assignmentScores.length
      : 0;

  return Math.round(averageScore * 100) / 100;
}
