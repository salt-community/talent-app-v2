import React from "react";
import { LevelRectangle } from "./level-rectangle";
import { assignmentsService } from "../instance";

type Props = {
  identityId: string;
};

export async function AverageScore({ identityId }: Props) {
  const averageScore =
    await assignmentsService.getAverageScoresByIdentityId(identityId);

  return <LevelRectangle percentage={averageScore} />;
}
