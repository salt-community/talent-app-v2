import React from "react";
import { developerProfilesService } from "../instance";

export async function DeveloperAssignment({ slug }: { slug: string }) {
  const currentUser = await developerProfilesService.getCurrentUsers();

  const identityId = currentUser?.id;

  if (!identityId) {
    return <div>DeveloperAssignment</div>;
  }
  const assignments =
    await developerProfilesService.getScoredAssignmentsByIdentityId(identityId);

  const assignment = assignments.find((assignment) => assignment.slug === slug);

  return (
    <div>
      <h2>{assignment.title}</h2>
    </div>
  );
}
