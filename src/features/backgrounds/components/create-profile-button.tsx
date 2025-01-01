"use client";
import { AlertDialogDemo, Button } from "@/components";
import { addDeveloperProfileAction } from "../actions";
import { useRouter } from "next/navigation";

interface Props {
  identityid: string;
}

export function CreateProfileButton({ identityid }: Props) {
  const router = useRouter();
  const addProfile = async () => {
    await addDeveloperProfileAction(identityid);
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
