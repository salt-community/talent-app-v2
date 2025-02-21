"use client";

import { AlertDialogDemo, Button } from "@/components";
import { addDeveloperProfileAction } from "../actions";

interface Props {
  identityId: string;
}

export function CreateProfileButton({ identityId: identityId }: Props) {
  const addProfile = async () => {
    await addDeveloperProfileAction(identityId);
  };

  return (
    <AlertDialogDemo
      title={"Confirmation Required"}
      description={"Are you sure you want to create a new profile?"}
      onConfirm={() => addProfile()}
    >
      <Button> <span>+</span> New Profile</Button>
    </AlertDialogDemo>
  );
}
