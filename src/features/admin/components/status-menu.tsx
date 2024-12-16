"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { Status } from "./status";
import { Button } from "@/components";
import { deleteDeveloperProfileAction, updateStatusAction } from "../action";
import { useToast } from "@/hooks/use-toast";
import { AlertDialogDemo } from "@/components/alert-dialog/alertDialog";
import { useState } from "react";

type Props = {
  id: string;
  developerStatus: "unpublished" | "published" | "highlighted";
};

export function StatusMenu({ id, developerStatus }: Props) {
  const [status, setStatus] = useState<
    "unpublished" | "published" | "highlighted"
  >(developerStatus);
  const { toast } = useToast();

  async function onDelete() {
    await deleteDeveloperProfileAction(id);
    toast({
      title: "Profile deleted",
      description: "The developer profile has been successfully deleted",
    });
  }
  async function onStatusChange(
    newStatus: "unpublished" | "published" | "highlighted"
  ) {
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
          <EllipsisVertical className="text-neutral fill-neutral" size={28} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuRadioGroup
            value={status}
            onValueChange={(value) =>
              onStatusChange(
                value as "unpublished" | "published" | "highlighted"
              )
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

            <AlertDialogDemo
              title={"Are you sure?"}
              description={"This action can't be undone, are you sure?"}
              onConfirm={onDelete}
            >
              <Button size={"sm"} className="w-full">
                Delete
              </Button>
            </AlertDialogDemo>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
