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
  const [filterStatus, setFilterStatus] = useState({
    highlighted: false,
    published: true,
    unpublished: true,
  });

  function filterDevelopers(developers: Developer[]) {
    return developers.filter((developer) => {
      if (filterStatus.highlighted && developer.status === "highlighted")
        return true;
      if (filterStatus.published && developer.status === "published")
        return true;
      if (filterStatus.unpublished && developer.status === "unpublished")
        return true;
      return false;
    });
  }
  const filteredDevelopers = filterDevelopers(developers);

  return (
    <div>
      <div className="flex justify-between">
        {/* <Input placeholder="Type to search" defaultValue={""} /> */}
        <div className="w-full bg-white pt-4 pr-4 z-10">
          <Input placeholder="Type to search" />
        </div>
        <DevelopersFilter
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />
      </div>
      <div>
        {filteredDevelopers.length !== 0 &&
          filteredDevelopers.map((developer) => (
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
