"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/";
import { useToast } from "@/hooks/use-toast";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";

import { Status } from "./status";
import { updateRoleAction } from "../action";

type Props = {
  id: string;
  role: string;
};

export function StatusMenuIdentity({ id, role }: Props) {
  const [IdentityRole, setRole] = useState<string>(role);
  const { toast } = useToast();

  async function onStatusChange(newRole: string) {
    await updateRoleAction(id, newRole);
    setRole(newRole);
    toast({
      title: "Role updated",
      description: "The role has been successfully updated",
    });
  }

  return (
    <div className="flex items-center gap-4">
      <Status status={IdentityRole} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <EllipsisVertical
            className="text-neutral fill-neutral hover:text-primary transition-colors cursor-pointer"
            size={28}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuRadioGroup
            value={IdentityRole}
            onValueChange={(value) => onStatusChange(value as string)}
          >
            <DropdownMenuRadioItem value="admin">Admin</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="developer">
              Developer
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="core">Core</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
