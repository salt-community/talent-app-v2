"use client";

import { DeveloperProfileList } from "./developer-profile-list";
import { Developer } from "../types";
import DevelopersFilter from "./developer-filter";
import { Input } from "@/components";
import { useState } from "react";

type Props = {
  developers: Developer[];
};

export function DeveloperDashboard({ developers }: Props) {
  const [search, handleSearch] = useState("");
  return (
    <div>
      <div className="flex justify-between">
        <Input placeholder="Type to search" defaultValue={search} />{" "}
        <DevelopersFilter />
      </div>
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
    </div>
  );
}
