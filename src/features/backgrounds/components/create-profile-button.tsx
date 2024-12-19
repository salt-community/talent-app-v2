"use client";

import { Button } from "@/components";

interface Props {
  addProfile: () => Promise<void>;
}

export function CreateProfileButton({ addProfile }: Props) {
  return <Button onClick={addProfile}>Create new profile</Button>;
}
