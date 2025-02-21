import { AssignmentScore } from "./types";

export function averageScore(assignmentScores: number[]) {
  const averageScore =
    assignmentScores.length > 0
      ? assignmentScores.reduce((sum, score) => sum + score, 0) /
        assignmentScores.length
      : 0;
  return averageScore;
}

export function averageScoresByCategory(assignmentScores: AssignmentScore[]) {
  const averageScores = {
    frontend: 0,
    backend: 0,
    conversation: 0,
    team_collaboration: 0,
    design: 0,
    management: 0,
  };
  return;
}
