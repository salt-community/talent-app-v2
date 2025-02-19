import { Avatar, AvatarImage } from "@/components/ui/avatar";
import React from "react";

export default function DashboardAvatarIdentity() {
  return (
    <Avatar className="h-10 w-10">
      <AvatarImage src={"/avatar.png"} />
    </Avatar>
  );
}
