import { Card, CardContent } from "@/components";
import { developerService } from "@/features";
import { Background } from "@/features/backgrounds/components/background";
import React from "react";

type Params = {
  params: Promise<{ identityid: string }>;
};

export default async function page({ params }: Params) {
  const { identityid } = await params;
  console.log("identity", identityid);
  const devIds = await developerService.getAllById(identityid);
  console.log("devIds", devIds);
  return (
    <main className="px-4">
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
      <button>Create new profile</button>
    </main>
  );
}
