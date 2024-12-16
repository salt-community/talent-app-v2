import React from "react";
import { DashboardAvatar } from "./dashboard-avatar";
import { StatusMenu } from "./status-menu";
type DeveloperProfileListProps = {
  id: string;
  name: string;
  email: string;
};

export function DeveloperProfileList({
  id,
  name,
  email,
}: DeveloperProfileListProps) {
  return (
    <div className="flex items-center py-3 gap-2">
      <DashboardAvatar />
      <div className="flex justify-between items-center w-full">
        <div>
          <p>{name}</p>
          <p className="text-paragraphLight text-sm">{email}</p>
        </div>
        <StatusMenu id={id} />
      </div>
    </div>
  );
}
