"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { deleteDeveloperProfileAction, updateStatusAction } from "../action";
import { Status } from "./status";
import { DeleteDialog } from "./delete-button";
import type { DeveloperProfileStatus } from "@/features";

type Props = {
  id: string;
  developerStatus: DeveloperProfileStatus;
};

export function StatusMenu({ id, developerStatus }: Props) {
  const [status, setStatus] = useState<DeveloperProfileStatus>(developerStatus);
  const { toast } = useToast();

  async function onDelete() {
    await deleteDeveloperProfileAction(id);
    toast({
      title: "Profile deleted",
      description: "The developer profile has been successfully deleted",
    });
  }
  async function onStatusChange(newStatus: DeveloperProfileStatus) {
    await updateStatusAction(id, newStatus);
    setStatus(newStatus);
    toast({
      title: "Status updated",
      description: "The developer profile status has been successfully updated",
    });
  }

  return (
    <div className="flex items-center gap-4">
      <Status status={status} />
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
            onValueChange={(value) =>
              onStatusChange(value as DeveloperProfileStatus)
            }
          >
            <DropdownMenuRadioItem value="highlighted">
              Highlighted
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="published">
              Published
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="unpublished">
              Unpublished
            </DropdownMenuRadioItem>
            <DeleteDialog onConfirm={onDelete} />
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
