"use server";
import { developerProfilesService } from "../instance";
import { notFound } from "next/navigation";
import { AssignmentCard } from "./assignment-card";

export async function DeveloperAssignments() {
  const profiles = await developerProfilesService.getCurrentUsers();
  const identityId = profiles?.id;

  if (!identityId) {
    return notFound();
  }

  const assignments =
    await developerProfilesService.getScoredAssignmentsByIdentityId(identityId);
  const averageScores =
    await developerProfilesService.getAverageScoresByIdentityId(identityId);

  console.log(assignments);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <AssignmentCard assignment={assignments} averageScores={averageScores} />
    </div>
  );
}
