import { Assignment, AssignmentScore } from "./types";

export const calculateAverageAssignmentsScore = (
  assignmentScores: AssignmentScore[]
): number => {
  const scores = assignmentScores
    .map((assignment) => Number(assignment.score))
    .filter((score) => !isNaN(score));

  if (scores.length === 0) return 0;

  const averageAssignmentScore =
    scores.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    ) / scores.length;

  return Math.round(averageAssignmentScore);
};

export const calculateAverageCategoryScore = (
  assignmentScores: AssignmentScore[],
  assignments: Assignment[],
  category: string
): number => {
  const categoryAssignmentIds = assignments
    .filter((assignment) => (assignment.tags ?? []).includes(category))
    .map((assignment) => assignment.id);

  const scores = assignmentScores
    .filter((score) => categoryAssignmentIds.includes(score.assignmentId))
    .map((assignmentScore) => Number(assignmentScore.score))
    .filter((score) => !isNaN(score));

  if (scores.length === 0) return 0;

  const averageCategoryScore =
    scores.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    ) / scores.length;

  return Math.round(averageCategoryScore);
};
