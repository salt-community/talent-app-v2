"use client";

import { DeveloperProfileList } from "./developer-profile-list";
import { Developer } from "../types";
import { ScrollArea } from "@/components";

type Props = {
  developers: Developer[];
};

export function DeveloperDashboard({ developers }: Props) {
  return (
    <ScrollArea className="h-[calc(100vh-4rem)]">
      <div>
        {developers.map((developer) => (
          <DeveloperProfileList
            id={developer.id}
            key={developer.id}
            name={developer.name}
            email={developer.email}
            status={developer.status}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
