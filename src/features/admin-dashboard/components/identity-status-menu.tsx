"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import { deleteUserAction, updateRoleAction } from "../action";
import { DeleteDialog } from "./delete-button";
import { IdentityStatus } from "./identity-status";


type Props = {
  id: string;
  role: string;
};

export function IdentityStatusMenu({ id, role }: Props) {
  const [IdentityRole, setRole] = useState<string>(role);

  async function onDelete() {
    toast.promise(new Promise(async (resolve) => {
      await deleteUserAction(id);
      resolve(true);
    }), {
      loading: "Deleting user...",
      success: "User deleted successfully",
      error: "Error deleting user",
    });
  }

  async function onStatusChange(newRole: string) {
    toast.promise(new Promise(async (resolve) => {
      await updateRoleAction(id, newRole);
      resolve(true);
    }),
      {
        loading: "Updating user role...",
        success: "User role updated successfully",
        error: "Error updating user role",
      });
    setRole(newRole);
  }

  return (
    <div className="flex items-center gap-4">
      <IdentityStatus status={IdentityRole} />
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
            <DropdownMenuRadioItem value="admin" className="cursor-pointer">Admin</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="developer" className="cursor-pointer">
              Developer
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="core" className="cursor-pointer">Core</DropdownMenuRadioItem>
            <DeleteDialog onConfirm={onDelete} />
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
