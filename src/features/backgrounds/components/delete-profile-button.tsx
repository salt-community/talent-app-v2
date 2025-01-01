"use client";

import { AlertDialogDemo } from "@/components";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";
import { deleteDeveloperProfileAction } from "../actions";

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
      description={"This will delete your profile!"}
      onConfirm={() => deleteProfile()}
    >
      <X />
    </AlertDialogDemo>
  );
}
