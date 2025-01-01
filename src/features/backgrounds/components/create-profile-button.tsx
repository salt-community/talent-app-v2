"use client";
import { Button } from "@/components";
import { addDeveloperProfileAction } from "../actions";

interface Props {
  identityid: string;
}

export function CreateProfileButton({ identityid }: Props) {
  const addProfile = async () => {
    await addDeveloperProfileAction(identityid);
  };

  return <Button onClick={addProfile}>Create new profile</Button>;
}
