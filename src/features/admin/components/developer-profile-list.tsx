import React from "react";
import { DashboardAvatar } from "./dashboard-avatar";
import { StatusMenu } from "./status-menu";
type DeveloperProfileListProps = {
  id: string;
  name: string;
  email: string;
  status: "unpublished" | "published" | "highlighted";
};

export function DeveloperProfileList({
  id,
  name,
  email,
  status,
}: DeveloperProfileListProps) {
  return (
    <div className="flex items-center py-3 gap-2">
      <DashboardAvatar />
      <div className="flex justify-between items-center w-full">
        <div>
          <p className="text-header">{name}</p>
          <p className="text-paragraphLight text-sm">{email}</p>
        </div>
        <StatusMenu id={id} developerStatus={status} />
      </div>
    </div>
  );
}
