"use client";
import { AlertDialogDemo, Button } from "@/components";
import { useRouter } from "next/navigation";
import { addDeveloperProfileAction } from "../actions";

interface Props {
  identityId: string;
}

export function CreateProfileButton({ identityId: identityId }: Props) {
  const router = useRouter();
  const addProfile = async () => {
    await addDeveloperProfileAction(identityId);
    router.refresh();
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
