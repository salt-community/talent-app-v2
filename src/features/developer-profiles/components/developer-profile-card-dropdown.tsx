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
import {
  copyDeveloperProfileAction,
  deleteDeveloperProfileAction,
} from "../actions";
import { useToast } from "@/hooks/use-toast";

type Props = {
  developerProfileId: string;
};

export default function DeveloperProfileCardDropdown({
  developerProfileId,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  async function handleCopy() {
    await copyDeveloperProfileAction(developerProfileId);
    setIsOpen(false);
  }
  async function handleDelete() {
    await deleteDeveloperProfileAction(developerProfileId);
    toast({
      title: "Profile deleted",
      description: "The developer profile has been successfully deleted",
    });
    setIsOpen(false);
  }

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
            onClick={async (event) => {
              event.preventDefault();
              await handleCopy();
            }}
          >
            Copy
          </DropdownMenuItem>{" "}
          <DropdownMenuItem
            onClick={async (event) => {
              event.preventDefault();
              await handleDelete();
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
