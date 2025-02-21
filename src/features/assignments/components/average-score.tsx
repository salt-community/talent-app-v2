"use client";

import React from "react";
import { LevelRectangle } from "./level-rectangle";
import { Assignment } from "../types";

type Props = {
  assignments: Assignment[];
};

export function AverageScore({ assignments }: Props) {
  // const { assignments } = useAssignments();
  // const scores = assignments.map((a) => a.score ?? 0);
  // const averageScore = calculateAverageCategoryScore(assignments, "");

  const averageScore = 0;

  return <LevelRectangle percentage={averageScore} />;
}
