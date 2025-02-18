import React from "react";
import { backgroundsService } from "../instance";
import { DeveloperProfileCard } from "./developer-profile-card";

export async function DeveloperProfileList() {
  const profiles = await backgroundsService.GetCurrentUsers();
  return (
    <div>
      {Array.isArray(profiles) &&
        profiles.map((profile) => (
          <DeveloperProfileCard
            key={profile.id}
            developerProfileId={profile.id}
          />
        ))}
    </div>
  );
}
