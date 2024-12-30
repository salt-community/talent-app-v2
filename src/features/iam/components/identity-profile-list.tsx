import React from "react";
import { StatusMenuIdentity } from "./status-menu-identities";
import { IdentityRole } from "../types";
import DashboardAvatarIdentity from "./dashboard-avatar-identity";

type Props = {
  id: string;
  name: string;
  email: string;
  role: IdentityRole;
};

export default function IdentityProfileList({ id, name, email, role }: Props) {
  console.log("name:", role);
  return (
    <div className="flex items-center py-3 gap-2">
      <DashboardAvatarIdentity />
      <div className="flex justify-between items-center w-full">
        <div>
          <p>{name}</p>
          <p className="text-paragraphLight text-sm">{email}</p>
        </div>
        <div className="flex justify-center">
          <p className="px-4 hidden md:block capitalize">{role}</p>
          <StatusMenuIdentity id={id} role={role} />
        </div>
      </div>
    </div>
  );
}
