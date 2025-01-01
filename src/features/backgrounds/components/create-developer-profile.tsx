"use server";

import React from "react";
import { backgroundsService } from "../instance";
import { DeveloperProfileCard } from "./developer-profile-card";
import { CreateProfileButton } from "./create-profile-button";
import { errorHandler } from "@/lib";

type Props = {
  identityid: string;
};

export async function CreateDeveloperProfileCard({ identityid }: Props) {
  let devIds: {
    id: string;
  }[] = [];

  try {
    devIds = await backgroundsService.getAllDeveloperProfilesById(identityid);
  } catch (error) {
    errorHandler(error);
  }

  return (
    <div>
      <div className="flex flex-col p-4 items-center gap-4">
        <h1 className="text-xl font-semibold">Developer Profiles</h1>
        <CreateProfileButton identityid={identityid} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {devIds.map((devId, index) => (
          <DeveloperProfileCard key={index} devId={devId.id} />
        ))}
      </div>
    </div>
  );
}
