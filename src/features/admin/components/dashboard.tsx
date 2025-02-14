"use client";

import { H1 } from "@/components";
import { DeveloperProfileList } from "./developer-profile-list";
import Link from "next/link";
import { Developer } from "@/features/developer-profiles";

type Props = {
  developers: Developer[];
};

export function Dashboard({ developers }: Props) {
  return (
    <div>
      {developers.map((dev) => (
        <DeveloperProfileList
          id={dev.id}
          key={dev.id}
          name={dev.name}
          email={dev.email}
          status={dev.status}
        />
      ))}
    </div>
  );
}
