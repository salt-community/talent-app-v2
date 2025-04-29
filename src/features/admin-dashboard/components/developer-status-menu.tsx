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
import { deleteDeveloperProfileAction, updateStatusAction } from "../action";
import { DeleteDialog } from "./delete-button";
import { DeveloperStatus } from "./developer-status";
import toast from "react-hot-toast";

type Props = {
  id: string;
  developerStatus: string;
};

export function DeveloperStatusMenu({ id, developerStatus }: Props) {
  const [status, setStatus] = useState<string>(developerStatus);

  async function onDelete() {
    toast.promise(new Promise(async (resolve) => {
      await deleteDeveloperProfileAction(id);
      resolve(true);
    }
    ), {
      loading: "Deleting profile...",
      success: "Profile deleted successfully!",
      error: "Failed to delete profile. Please try again.",
    });
  }
  async function onStatusChange(newStatus: string) {
    toast.promise(new Promise(async (resolve) => {
      await updateStatusAction(id, newStatus);
      resolve(true);
    }
    ), {
      loading: "Updating status...",
      success: "Status updated successfully!",
      error: "Failed to update status. Please try again.",
    });
    setStatus(newStatus);
  }

  return (
    <div className="flex items-center gap-4">
      <p className="px-4 hidden md:block capitalize">{status}</p>
      <DeveloperStatus status={status} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <EllipsisVertical
            className="text-neutral fill-neutral hover:text-primary transition-colors cursor-pointer"
            size={28}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuRadioGroup
            value={status}
            onValueChange={(value) => onStatusChange(value as string)}
          >
            <DropdownMenuRadioItem value="highlighted" className="cursor-pointer">
              Highlighted
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="published" className="cursor-pointer">
              Published
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="unpublished" className="cursor-pointer">
              Unpublished
            </DropdownMenuRadioItem>
            <DeleteDialog onConfirm={onDelete} />
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
