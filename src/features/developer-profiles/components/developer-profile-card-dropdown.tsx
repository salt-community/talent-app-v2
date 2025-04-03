"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  Button,
} from "@/components/";
import { Ellipsis } from "lucide-react";
import { useState } from "react";
import { copyDeveloperProfileAction } from "../actions";

type Props = {
  developerProfileId: string;
};

export default function DeveloperProfileCardDropdown({
  developerProfileId,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <div className="flex">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-9 rounded-full"
              title="Options"
              onClick={(event) => {
                event.preventDefault();
              }}
            >
              <Ellipsis />
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuItem
            onClick={(event) => {
              event.preventDefault();
              copyDeveloperProfileAction(developerProfileId);
              setIsOpen(false);
            }}
          >
            Copy
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(event) => {
              event.preventDefault();
              setIsOpen(false);
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
