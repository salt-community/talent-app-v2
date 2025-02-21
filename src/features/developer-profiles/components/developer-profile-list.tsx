import React from "react";
import { backgroundsService } from "../../backgrounds/instance";
import { DeveloperProfileCard } from "./developer-profile-card";
import { CreateProfileButton } from "./create-profile-button";
import { notFound } from "next/navigation";

export async function DeveloperProfileList() {
  const profiles = await backgroundsService.GetCurrentUsers();
  const identityId = profiles?.id;

  if (!identityId) {
    return notFound();
  }

  return (
    <div className="mx-auto md:px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-4">Developer Profiles</h1>
        <div className="mb-6">
          <CreateProfileButton identityId={identityId} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(profiles.developerProfile) &&
          profiles.developerProfile.map((profile) => (
            <div key={profile.id}>
              <DeveloperProfileCard developerProfileId={profile.id} />
            </div>
          ))}
      </div>
    </div>
  );
}
