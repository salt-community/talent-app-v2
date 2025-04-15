"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  Button,
} from "@/components/";
import { Ellipsis } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import {
  copyDeveloperProfileAction,
  deleteDeveloperProfileAction,
} from "../actions";
import { useToast } from "@/hooks/use-toast";

type Props = {
  developerProfileId: string;
  setIsTitleEditable: Dispatch<SetStateAction<boolean>>;
};

export default function DeveloperProfileCardDropdown({
  developerProfileId,
  setIsTitleEditable,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  async function handleCopy() {
    await copyDeveloperProfileAction(developerProfileId);
    toast({
      title: "Profile copied",
      description: "The developer profile has been successfully copied",
    });
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
  function handleEdit() {
    setIsTitleEditable(true);
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
            onClick={(event) => {
              event.preventDefault();
              handleEdit();
            }}
          >
            Edit Title
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={async (event) => {
              event.preventDefault();
              await handleCopy();
            }}
          >
            Copy
          </DropdownMenuItem>
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
