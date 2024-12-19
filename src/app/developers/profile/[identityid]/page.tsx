import { Card, CardContent } from "@/components";
import { developerService, iamService } from "@/features";
import { Background } from "@/features/backgrounds/components/background";
import { CreateProfileButton } from "@/features/backgrounds/components/create-profile-button";
import { revalidatePath } from "next/cache";
import React from "react";

type Params = {
  params: Promise<{ identityid: string }>;
};

export default async function page({ params }: Params) {
  const { identityid } = await params;
  const devIds = await developerService.getAllById(identityid);

  async function addProfile() {
    "use server";
    await iamService.createDeveloperProfile(identityid);
    revalidatePath(`/developers/profile/${identityid}`);
  }

  return (
    <main className="px-4 container mx-auto">
      <ul className="pt-14 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {devIds.map((devId) => (
          <li key={devId.id} className="">
            <Card className="p-2 h-full justify-center min-w-[20rem]">
              <CardContent>
                <Background devid={devId.id} />
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
      <CreateProfileButton addProfile={addProfile} />
    </main>
  );
}
