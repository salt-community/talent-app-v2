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
import toast from "react-hot-toast";
import {
  copyDeveloperProfileAction,
  deleteDeveloperProfileAction,
} from "../actions";

type Props = {
  developerProfileId: string;
  setIsTitleEditable: Dispatch<SetStateAction<boolean>>;
};

export default function DeveloperProfileCardDropdown({
  developerProfileId,
  setIsTitleEditable,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  async function handleCopy() {
    toast.promise(
      new Promise(async (resolve) => {
        await copyDeveloperProfileAction(developerProfileId);
        resolve(true);
      }),
      {
        loading: "Copying profile...",
        success: "Profile copied successfully!",
        error: "Profile could not be copied! Please try again.",
      }
    );

    setIsOpen(false);
  }
  async function handleDelete() {
    toast.promise(
      new Promise(async (resolve) => {
        await deleteDeveloperProfileAction(developerProfileId);
        resolve(true);
      }),
      {
        loading: "Deleting profile...",
        success: "Profile deleted successfully!",
        error: "Profile could not be deleted! Please try again.",
      }
    );
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
              className="h-8 w-9 rounded-full cursor-pointer"
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
            className="cursor-pointer"
          >
            Edit Title
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={async (event) => {
              event.preventDefault();
              await handleCopy();
            }}
            className="cursor-pointer"
          >
            Copy
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={async (event) => {
              event.preventDefault();
              await handleDelete();
            }}
            className="cursor-pointer"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
