import { Card, CardContent } from "@/components";
import React from "react";
import { Background } from "./background";

type Props = {
  identityId: string;
  devId: string;
};

export function DeveloperProfileCard({ devId }: Props) {
  return (
    <main className="px-4 container mx-auto">
      <ul className="pt-14 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        <li className="">
          <Card className="p-2 h-full justify-center min-w-[20rem]">
            <CardContent>
              <Background devId={devId} />
            </CardContent>
          </Card>
        </li>
      </ul>
    </main>
  );
}
