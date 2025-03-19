"use client";
import { useState } from "react";
import IdentityProfileList from "./identity-profile-list";
import { Identity } from "../types";
import IdentityFilter from "./identity-filter";

type Props = {
  identities: Identity[];
};

export function IdentityDashboard({ identities }: Props) {
  const [filterStatus, setFilterStatus] = useState({
    developer: true,
    core: true,
    admin: true,
  });

  function filterDevelopers(identities: Identity[]) {
    const identitiesFilteredByRole = identities.filter((identity) => {
      if (filterStatus.developer && identity.role === "developer") return true;
      if (filterStatus.core && identity.role === "core") return true;
      if (filterStatus.admin && identity.role === "admin") return true;
      return false;
    });
    // return developersFilteredByStatus.filter((developer) =>
    //   developer.name.toLocaleLowerCase().includes(searchFilter)
    // );
    return identitiesFilteredByRole;
  }
  const filteredDevelopers = filterDevelopers(identities);

  return (
    <div>
      <div className="flex justify-between">
        <IdentityFilter
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />
      </div>
      <div className="flex flex-col gap-2">
        {filteredDevelopers.map((identity) => (
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
