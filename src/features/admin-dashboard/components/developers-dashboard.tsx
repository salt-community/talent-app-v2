"use client";

import { DeveloperProfileList } from "./developer-profile-list";
import { Developer } from "../types";
import DevelopersFilter from "./developer-filter";
import { Input } from "@/components";
import { ChangeEvent, useState } from "react";

type Props = {
  developers: Developer[];
};

export function DeveloperDashboard({ developers }: Props) {
  const [filterStatus, setFilterStatus] = useState({
    highlighted: false,
    published: true,
    unpublished: true,
  });
  const [searchFilter, setSearchFilter] = useState("");

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchFilter(event.target.value);
  }

  function filterDevelopers(developers: Developer[]) {
    const developersFilteredByStatus = developers.filter((developer) => {
      if (filterStatus.highlighted && developer.status === "highlighted")
        return true;
      if (filterStatus.published && developer.status === "published")
        return true;
      if (filterStatus.unpublished && developer.status === "unpublished")
        return true;
      return false;
    });
    return developersFilteredByStatus.filter((developer) =>
      developer.name.toLocaleLowerCase().includes(searchFilter)
    );
  }
  const filteredDevelopers = filterDevelopers(developers);

  return (
    <div>
      <div className="flex justify-between">
        <div className="w-full bg-white pt-4 pr-4 z-10">
          <Input placeholder="Type to search" onChange={handleSearchChange} />
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
