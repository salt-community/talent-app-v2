"use server";
import Link from "next/link";
import { developerProfilesService } from "../instance";
import { Separator } from "@/components";
import { notFound } from "next/navigation";
import { ScoreDetails } from "./score-details";
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

  const getScoreColorClass = (score: number) => {
    if (score <= 50) {
      return "text-red-600 font-extrabold";
    } else if (score >= 51 && score <= 94) {
      return "text-orange-500";
    } else {
      return "text-green-500";
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <AssignmentCard assignment={assignments} averageScore={averageScores} />
    </div>
  );
}
