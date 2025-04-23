"use client";
import { Button, H2 } from "@/components";
import { BackgroundAvatar } from "./avatar";
import { DeveloperProfile } from "../../types";
import { useState } from "react";
import { CardEditableField } from "./card-editable-field";
import { Check } from "lucide-react";
import { updateProfileCard } from "../../actions";
import DeveloperProfileCardDropdown from "../developer-profile-card-dropdown";

type Props = { developerProfile: DeveloperProfile };

export function InlineEditableCard({ developerProfile }: Props) {
  const [isEditable, setIsEditable] = useState(false);
  const [draftDeveloperProfile, setDraftDeveloperProfile] = useState({
    ...developerProfile,
    title: developerProfile.title || "",
  });

  const handleOnSave = async () => {
    await updateProfileCard({
      id: draftDeveloperProfile.id,
      title: draftDeveloperProfile.title,
      name: draftDeveloperProfile.name,
    });
    setDraftDeveloperProfile(draftDeveloperProfile);
    setIsEditable(false);
  };

  return (
    <section className="flex justify-between w-full gap-2">
      <div className="flex gap-5 items-center justify-between w-full">
        <BackgroundAvatar url={developerProfile.avatarUrl} size={"md"} />
        <div className="flex flex-col gap-0 w-full">
          <CardEditableField
            value={draftDeveloperProfile.title}
            placeholder="Title"
            isEditable={isEditable}
            textStyle="uppercase text-sm font-semibold"
            onChange={(value) => {
              setDraftDeveloperProfile({
                ...draftDeveloperProfile,
                title: value,
              });
            }}
            onKeyDown={(event) => {
              if (isEditable && event.key === "Enter") {
                event.preventDefault();
                setIsEditable(false);
              }
            }}
          />
          <div className="px-1">
            <H2>{developerProfile.name}</H2>
          </div>
        </div>
      </div>
      {isEditable ? (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-9 rounded-full"
          title="Save"
          onClick={(event) => {
            event.preventDefault();
            handleOnSave();
          }}
        >
          <Check strokeWidth={3} />
        </Button>
      ) : (
        <>
          <DeveloperProfileCardDropdown
            developerProfileId={developerProfile.id}
            setIsTitleEditable={setIsEditable}
          />
        </>
      )}
    </section>
  );
}
