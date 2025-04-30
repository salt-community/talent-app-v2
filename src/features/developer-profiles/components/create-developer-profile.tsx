"use server";

import { errorHandler } from "@/lib";
import { CreateProfileButton } from "./create-profile-button";
import { DeveloperProfileCard } from "./developer-profile-card";
import { developerProfilesService } from "../instance";

type Props = {
  slug: string;
};

export async function CreateDeveloperProfileCard({ slug }: Props) {
  developerProfilesService.getAll();
  const developerProfile = await developerProfilesService.getAll();

  const developerProfileId = developerProfile.find(
    (profile) => profile.slug === slug
  )?.id;

  if (!developerProfileId) {
    return;
  }

  let developerProfileIds: {
    id: string;
  }[] = [];

  try {
    developerProfileIds =
      await developerProfilesService.getAllById(developerProfileId);
  } catch (error) {
    errorHandler(error);
  }

  return (
    <div>
      <div className="flex flex-col p-4 items-center gap-4">
        <h1 className="text-xl font-semibold">Developer Profiles</h1>
        <CreateProfileButton identityId={developerProfileId} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-4">
        {developerProfileIds.map((developerProfileId, index) => (
          <DeveloperProfileCard
            key={index}
            developerProfileId={developerProfileId.id}
          />
        ))}
      </div>
    </div>
  );
}
