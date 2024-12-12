import React from "react";
import { LevelRectangle } from "./level-rectangle";
import { Assignment as AssignmentType } from "../types";
import { calculateAverageAssignmentsScore } from "../logic";



type Props = {
  assignments: AssignmentType[]
}
export function AverageScore({ assignments }: Props) { 
const averageScore = calculateAverageAssignmentsScore(assignments)

  return <LevelRectangle percentage={averageScore} />;
}
