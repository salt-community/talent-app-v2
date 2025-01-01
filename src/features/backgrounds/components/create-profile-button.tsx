"use client";

import { Button } from "@/components";

interface Props {
  onAddProfile: () => void;
}

export function CreateProfileButton({ onAddProfile }: Props) {
  return <Button onClick={onAddProfile}>Create new profile</Button>;
}
