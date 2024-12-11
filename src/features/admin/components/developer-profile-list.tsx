import React from "react";
import { DashboardAvatar } from "./dashboar-avatar";
type DeveloperProfileListProps = {
  name: string;
  email: string;
};

export function DeveloperProfileList({
  name,
  email,
}: DeveloperProfileListProps) {
  return (
    <div className="flex items-center py-3 gap-2">
      <DashboardAvatar />
      <div>
      <p>{name}</p>
      <p className="text-paragraphLight text-sm">{email}</p>
      </div>

    </div>
  );
}
