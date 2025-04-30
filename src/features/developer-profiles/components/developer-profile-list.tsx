import React from "react";
import { DeveloperProfileCard } from "./developer-profile-card";
import { CreateProfileButton } from "./create-profile-button";
import { developerProfilesService } from "../instance";

export async function DeveloperProfileList() {
  const profiles = await developerProfilesService.getCurrentUsers();
  const identityId = profiles?.id;

  if (!identityId) {
    return;
  }

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {Array.isArray(profiles.developerProfile) &&
        profiles.developerProfile.map((profile) => (
          <DeveloperProfileCard
            developerProfileId={profile.id}
            key={profile.id}
          />
        ))}
      <div className="mb-6">
        <CreateProfileButton identityId={identityId} />
      </div>
    </div>
  );
}
