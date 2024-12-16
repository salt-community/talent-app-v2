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

export function StatusMenu() {
  const [status, setStatus] = React.useState("gray");

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
            <Button size={"sm"} className="w-full">
              Delete
            </Button>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
