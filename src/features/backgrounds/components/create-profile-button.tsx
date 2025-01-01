"use client";
import { AlertDialogDemo, Button } from "@/components";
import { addDeveloperProfileAction } from "../actions";

interface Props {
  identityid: string;
}

export function CreateProfileButton({ identityid }: Props) {
  const addProfile = async () => {
    await addDeveloperProfileAction(identityid);
  };

  return (
    <AlertDialogDemo
      title={"Confirmation Required"}
      description={"Are you sure you want to create a new profile?"}
      onConfirm={() => addProfile()}
    >
      <Button>Create New Profile</Button>
    </AlertDialogDemo>
  );
}
