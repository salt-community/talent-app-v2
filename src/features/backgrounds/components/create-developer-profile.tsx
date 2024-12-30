import React from "react";
import { backgroundsService } from "../instance";
import { DeveloperProfileCard } from "./developer-profile-card";
import { addDeveloperProfileAction } from "../actions";
import { CreateProfileButton } from "./create-profile-button";

type Props = {
  identityid: string;
};

export async function CreateDeveloperProfileCard({ identityid }: Props) {
  const devIds =
    await backgroundsService.getAllDeveloperProfilesById(identityid);

  async function addProfile() {
    "use server";
    await addDeveloperProfileAction(identityid);
  }

  return (
    <>
      <div className=" md:grid-cols-3 grid grid-cols-1 gap-4">
        {devIds.map((devId, index) => (
          <DeveloperProfileCard
            key={index}
            identityId={identityid}
            devId={devId.id}
          />
        ))}
      </div>

      <CreateProfileButton onAddProfile={addProfile} />
    </>
  );
}
