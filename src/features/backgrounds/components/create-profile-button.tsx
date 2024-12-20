"use client";

import { Button } from "@/components";

interface Props {
  addProfile: () => Promise<void>;
}

export function CreateProfileButton({ addProfile }: Props) {
  return (
    <div className="container mx-auto pt-14">
      <Button onClick={addProfile}>Create new profile</Button>
    </div>
  );
}
