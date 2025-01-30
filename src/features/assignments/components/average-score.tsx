"use client";

import React from "react";
import { LevelRectangle } from "./level-rectangle";
import { useAssignments } from "../assignments-context";
import { calculateAverageAssignmentsScore } from "../logic";

export function AverageScore() {
  const { assignments } = useAssignments();
  const scores = assignments.map((a) => a.score ?? 0);
  const averageScore = calculateAverageAssignmentsScore(scores);

  return <LevelRectangle percentage={averageScore} />;
}
