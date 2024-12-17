import { Assignment } from "./types";

// export const calculateCategoriesScores = (scores: Scores) => {
//   const programmingScore =
//     (scores.frontend + scores.backend) / 2;
//   const planningScore = (scores.management + scores.design) / 2;
//   const communicationScore =
//     (scores.individualCommunication +
//       scores.teamCollaboration) /
//     2;
//   const averageScore = Math.round(
//     (programmingScore + planningScore + communicationScore) / 3
//   );

//   return {
//     programmingScore: Math.round(programmingScore),
//     planningScore: Math.round(planningScore),
//     communicationScore: Math.round(communicationScore),
//     averageScore,
//   };
// };

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
    .filter((assignment) => assignment.tags.includes(category))
    .map((assignment) => assignment.score);
  const averageAssignmentScore =
    scores.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    ) / scores.length;
  return isNaN(averageAssignmentScore) ? 0 : Math.round(averageAssignmentScore);
};
