"use client";
import { Button, H2 } from "@/components";
import { BackgroundAvatar } from "./avatar";
import { DeveloperProfile } from "../../types";
import { useState } from "react";
import { CardEditableField } from "./card-editable-field";
import { Check, Pen } from "lucide-react";

type Props = { developerProfile: DeveloperProfile };

export function InlineEditableCard({ developerProfile }: Props) {
  const [isEditable, setIsEditable] = useState(false);
  const [draftDeveloperProfile, setDraftDeveloperProfile] =
    useState(developerProfile);

  if (
    developerProfile.headline === null ||
    draftDeveloperProfile.headline === null
  ) {
    developerProfile.headline = "";
    draftDeveloperProfile.headline = "";
  }
  return (
    <section className="flex justify-between w-full gap-2">
      <div className="flex gap-5 items-center justify-between w-full">
        <BackgroundAvatar url={developerProfile.avatarUrl} />
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

          <CardEditableField
            value={draftDeveloperProfile.headline}
            placeholder="Headline"
            isEditable={isEditable}
            textStyle="text-md font-light text-slate-600"
            onChange={(value) => {
              setDraftDeveloperProfile({
                ...draftDeveloperProfile,
                headline: value,
              });
            }}
            onKeyDown={(event) => {
              if (isEditable && event.key === "Enter") {
                event.preventDefault();
                setIsEditable(false);
              }
            }}
          />
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
            setIsEditable(false);
          }}
        >
          <Check strokeWidth={3} />
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-9 rounded-full"
          title="Edit"
          onClick={(event) => {
            event.preventDefault();
            setIsEditable(true);
          }}
        >
          <Pen />
        </Button>
      )}
    </section>
  );
}
