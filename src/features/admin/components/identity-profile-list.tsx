import React from "react";
import { StatusMenuIdentity } from "./status-menu-identities";
import { DashboardAvatar } from "./dashboard-avatar";

type Props = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export default function IdentityProfileList({ id, name, email, role }: Props) {
  return (
    <div className="flex items-center py-3 gap-2">
      <DashboardAvatar />
      <div className="flex justify-between items-center w-full">
        <div>
          <p>{name}</p>
          <p className="text-paragraphLight text-sm max-w-[180px] truncate md:max-w-none md:whitespace-normal">
            {email}
          </p>
        </div>
        <div className="flex justify-center">
          <p className="px-4 hidden md:block capitalize">{role}</p>
          <StatusMenuIdentity id={id} role={role} />
        </div>
      </div>
    </div>
  );
}
