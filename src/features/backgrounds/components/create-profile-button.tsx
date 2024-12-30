"use client";

import { Button } from "@/components";

interface Props {
  onAddProfile: () => void;
}

export function CreateProfileButton({ onAddProfile }: Props) {
  return (
    <div className="container mx-auto pt-14">
      <Button onClick={onAddProfile}>Create new profile</Button>
    </div>
  );
}
