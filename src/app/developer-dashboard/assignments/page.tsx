import { developerProfilesService } from "@/features/developer-profiles";
import { DeveloperAssignments } from "@/features/developer-profiles/components/developer-assigments";
import { notFound } from "next/navigation";
import React from "react";

export default async function Page() {
  const profiles = await developerProfilesService.getCurrentUsers();
  const identityId = profiles?.id;

  if (!identityId) {
    return notFound();
  }

  return <DeveloperAssignments identityId={identityId} />;
}
