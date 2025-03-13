"use client";

import { DeveloperProfileList } from "./developer-profile-list";
import { Developer } from "../types";

type Props = {
  developers: Developer[];
};

export function DeveloperDashboard({ developers }: Props) {
  return (
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
  );
}
