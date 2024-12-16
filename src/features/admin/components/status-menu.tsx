"use client";

import * as React from "react";
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
import { deleteDeveloperProfileAction } from "../action";
import { useToast } from "@/hooks/use-toast";
import { AlertDialogDemo } from "@/components/alert-dialog/alertDialog";

type Props = {
  id: string;
};

export function StatusMenu({ id }: Props) {
  const [status, setStatus] = React.useState("gray");
  const { toast } = useToast();

  async function onDelete() {
    await deleteDeveloperProfileAction(id);
    toast({
      title: "Profile deleted",
      description: "The developer profile has been successfully deleted",
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
          <DropdownMenuRadioGroup value={status} onValueChange={setStatus}>
            <DropdownMenuRadioItem value="purple">
              Highlighted
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="blue">
              Published
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="gray">
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
