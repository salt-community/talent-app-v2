import { Card, CardContent } from "@/components";
import React from "react";
import { DeveloperProfileLink } from "./developer-profile-link";
import { Background } from "../backgrounds";

type Props = {
  developerProfileId: string;
};

export async function DeveloperProfileCard({ developerProfileId }: Props) {
  return (
    <section className="mx-auto px-2">
      <ul className="pb-10 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        <li>
          <Card className="p-2 h-full justify-center min-w-[22rem] cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent>
              <DeveloperProfileLink developerProfileId={developerProfileId}>
                <Background developerProfileId={developerProfileId} />
              </DeveloperProfileLink>
            </CardContent>
          </Card>
        </li>
      </ul>
    </section>
  );
}
