"use client";

import { AlertDialogDemo } from "@/components";
import { deleteDeveloperProfileAction } from "../actions";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Props {
  devId: string;
}

export function DeleteProfileButton({ devId }: Props) {
  const { toast } = useToast();
  const deleteProfile = async () => {
    await deleteDeveloperProfileAction(devId);
    toast({
      title: "Profile deleted",
      description: "Your profile has been deleted",
    });
  };

  return (
    <AlertDialogDemo
      title={"Are you sure?"}
      description={"This will delete your assignment!"}
      onConfirm={() => deleteProfile()}
    >
      <X />
    </AlertDialogDemo>
  );
}
