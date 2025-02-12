"use server";

import { errorHandler } from "@/lib";
import { backgroundsService } from "../instance";
import { CreateProfileButton } from "./create-profile-button";
import { DeveloperProfileCard } from "./developer-profile-card";

type Props = {
  identityId: string;
};

export async function CreateDeveloperProfileCard({
  identityId: identityId,
}: Props) {
  let developerProfileIds: {
    id: string;
  }[] = [];

  try {
    developerProfileIds =
      await backgroundsService.getAllDeveloperProfilesById(identityId);
  } catch (error) {
    errorHandler(error);
  }

  return (
    <div>
      <div className="flex flex-col p-4 items-center gap-4">
        <h1 className="text-xl font-semibold">Developer Profiles</h1>
        <CreateProfileButton identityId={identityId} />
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
