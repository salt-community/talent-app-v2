"use client";
import { AlertDialogDemo, Button } from "@/components";
import { useRouter } from "next/navigation";
import {
  addDeveloperProfileAction,
  getDeveloperProfilesAction,
} from "../actions";
import { useCallback, useEffect, useState } from "react";

interface Props {
  identityId: string;
}

export function CreateProfileButton({ identityId: identityId }: Props) {
  const router = useRouter();
  const [hasProfile, setHasProfile] = useState(false);

  const fetchProfiles = useCallback(async () => {
    const profiles = await getDeveloperProfilesAction(identityId);
    setHasProfile((profiles?.length || 0) > 0);
  }, [identityId]);

  const addProfile = async () => {
    await addDeveloperProfileAction(identityId);
    fetchProfiles();
    router.refresh();
  };

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  return (
    <AlertDialogDemo
      title={"Confirmation Required"}
      description={"Are you sure you want to create a new profile?"}
      onConfirm={() => addProfile()}
    >
      <Button disabled={hasProfile}>Create New Profile</Button>
    </AlertDialogDemo>
  );
}
