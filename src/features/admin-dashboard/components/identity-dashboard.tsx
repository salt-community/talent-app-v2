"use client";
import { ChangeEvent, useState } from "react";
import IdentityProfileList from "./identity-profile-list";
import { Identity } from "../types";
import IdentityFilter from "./identity-filter";
import { Input } from "@/components";

type Props = {
  identities: Identity[];
};

export function IdentityDashboard({ identities }: Props) {
  const [filterStatus, setFilterStatus] = useState({
    developer: true,
    core: true,
    admin: true,
  });
  const [searchFilter, setSearchFilter] = useState("");

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchFilter(event.target.value);
  }
  function filterDevelopers(identities: Identity[]) {
    const identitiesFilteredByRole = identities.filter((identity) => {
      if (filterStatus.developer && identity.role === "developer") return true;
      if (filterStatus.core && identity.role === "core") return true;
      if (filterStatus.admin && identity.role === "admin") return true;
      return false;
    });
    const search = identitiesFilteredByRole.filter((identity) =>
      identity.name.toLocaleLowerCase().includes(searchFilter)
    );
    // console.log(search);
    return search;
  }
  const filteredDevelopers = filterDevelopers(identities);
  console.log(searchFilter);

  return (
    <div>
      <div className="flex justify-between">
        <div className="w-full bg-white pt-4 pr-4 z-10">
          <Input placeholder="Type to search" onChange={handleSearchChange} />
        </div>
        <IdentityFilter
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />
      </div>
      <div className="flex flex-col gap-2">
        {filteredDevelopers.length > 0 &&
          filteredDevelopers.map((identity) => (
            <IdentityProfileList
              id={identity.id}
              key={identity.id}
              name={identity.name}
              email={identity.email}
              role={identity.role}
            />
          ))}
      </div>
    </div>
  );
}
