import { Card, CardContent } from "@/components";
import React from "react";
import { Background } from "./background";
import { CreateProfileButton } from "./create-profile-button";
import { addDeveloperProfileAction } from "../actions";
import { backgroundsService } from "../instance";

export async function createDeveloperProfile(identityid: string) {
  const devIds =
    await backgroundsService.getAllDeveloperProfilesById(identityid);

  async function addProfile() {
    await addDeveloperProfileAction(identityid);
  }
  if (devIds.length === 0) {
    return (
      <main className="px-4 container mx-auto">
        <p>
          Note: New profiles are automatically assigned a developer role. If you
          need a different role (such as admin), please contact an administrator
          to request a role change.
        </p>
        <CreateProfileButton addProfile={addProfile} />
      </main>
    );
  }
  return (
    <main className="px-4 container mx-auto">
      <ul className="pt-14 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {devIds.map((devId) => (
          <li key={devId.id} className="">
            <Card className="p-2 h-full justify-center min-w-[20rem]">
              <CardContent>
                <Background devId={devId.id} />
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
      <CreateProfileButton addProfile={addProfile} />
    </main>
  );
}
