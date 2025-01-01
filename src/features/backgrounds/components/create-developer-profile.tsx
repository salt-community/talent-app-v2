import React from "react";
import { backgroundsService } from "../instance";
import { DeveloperProfileCard } from "./developer-profile-card";
import { addDeveloperProfileAction } from "../actions";
import { CreateProfileButton } from "./create-profile-button";
import { errorHandler } from "@/lib";

type Props = {
  identityid: string;
};

export async function CreateDeveloperProfileCard({ identityid }: Props) {
  let devIds: {
    id: string
  }[] = [];

  try {
    devIds = await backgroundsService.getAllDeveloperProfilesById(identityid);
  } catch (error) {
    errorHandler(error);
  }

  async function addProfile() {
    "use server";
    
    try {
      await addDeveloperProfileAction(identityid);
    } catch (error) {
      errorHandler(error)
    }
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
