import React from "react";
import { LevelRectangle } from "./level-rectangle";
import { assignmentsService } from "../instance";

type Props = {
  identityId: string;
};

export async function AverageScore({ identityId }: Props) {
  const assignmentScores =
    await assignmentsService.getScoresByIdentityId(identityId);
  const averageScore =
    assignmentScores.length > 0
      ? assignmentScores.reduce((sum, score) => sum + score, 0) /
        assignmentScores.length
      : 0;

  return <LevelRectangle percentage={averageScore} />;
}
