"use server";
import { developerProfilesService } from "../instance";
import { Assignment } from "../types";
import dynamic from "next/dynamic";

type AverageScoresMap = Map<string, number>;
type Props = {
  assignment: Assignment[];
  averageScores: AverageScoresMap;
};
const AssignmentCard = dynamic(
  () => import("./assignment-card").then((mode) => mode.AssignmentCard),
  {
    ssr: false,
    loading: () => <div className="w-full h-96 animate-pulse" />,
  }
);

export async function DeveloperAssignments() {
  const profiles = await developerProfilesService.getCurrentUsers();
  const identityId = profiles?.id;

  if (!identityId) {
    return;
  }

  const assignments =
    await developerProfilesService.getScoredAssignmentsByIdentityId(identityId);
  const averageScores =
    await developerProfilesService.getAverageScoresByIdentityId(identityId);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <AssignmentCard assignment={assignments} averageScores={averageScores} />
    </div>
  );
}
