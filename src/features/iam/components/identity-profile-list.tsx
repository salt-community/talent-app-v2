import { DashboardAvatar } from "@/features/admin/components/dashboard-avatar";
import React from "react";
import { StatusMenuIdentity } from "./status-menu-identities";
import { IdentityRole } from "../types";

type Props = {
  id: string;
  // name: string;
  // email: string;
  role: IdentityRole;
};

export default function IdentityProfileList({ id, role }: Props) {
  return (
    <div className="flex items-center py-3 gap-2">
      <DashboardAvatar />
      <div className="flex justify-between items-center w-full">
        <div>
          {/* <p>{name}</p>
          <p className="text-paragraphLight text-sm">{email}</p> */}
          <p>{role}</p>
          <StatusMenuIdentity id={id} role={role} />
        </div>
      </div>
    </div>
  );
}
