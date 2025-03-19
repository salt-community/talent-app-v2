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

  return (
    <div>
      <div className="flex justify-between">
        <IdentityFilter
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />
      </div>
      <div className="flex flex-col gap-2">
        {identities.map((identity) => (
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
