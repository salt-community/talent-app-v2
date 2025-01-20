import { Assignment } from "./types";

export const calculateAverageAssignmentsScore = (assignments: Assignment[]) => {
  const scores = assignments.map((assignment) => assignment.score);
  const averageAssignmentScore =
    scores.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    ) / scores.length;
  return Math.round(averageAssignmentScore);
};

export const calculateAverageCategoryScore = (
  assignments: Assignment[],
  category: string,
) => {
  const scores = assignments
    .filter((assignment) => (assignment.tags ?? []).includes(category))
    .map((assignment) => assignment.score);
  const averageAssignmentScore =
    scores.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    ) / scores.length;
  return isNaN(averageAssignmentScore) ? 0 : Math.round(averageAssignmentScore);
};
