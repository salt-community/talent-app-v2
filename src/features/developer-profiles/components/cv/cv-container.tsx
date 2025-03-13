"use client";

import { useState } from "react";
import { CvAside } from "./cv-aside";
import { CvHeader } from "./cv-header";
import { BackgroundInfo } from "../../types";
import { Check, Pencil } from "lucide-react";
import { updateCvAction } from "../../actions";
import { CvMainContent } from "./cv-main-content";

type Props = {
  background: BackgroundInfo;
  hasProfileAccess: boolean;
};

export function CvContainer({ background, hasProfileAccess }: Props) {
  const [isEditable, setIsEditable] = useState(false);
  const [backgroundInfo, setBackgroundInfo] = useState(background);
  const handleOnSave = async (background: BackgroundInfo) => {
    await updateCvAction(background);
    setIsEditable(false);
  };

  return (
    <section className="border-red-800 border-2 py-6 md:py-0 md:mx-auto md:min-h-[1122px] md:max-h-[1122px]  md:min-w-[795px] md:max-w-[795px]">
      <div className="flex items-center justify-between py-3 font-bold mx-2">
        <p className="hidden md:block text-start">{"</salt>"}</p>
        {isEditable ? (
          <Check
            onClick={() => handleOnSave(backgroundInfo)}
            className="cursor-pointer"
          />
        ) : (
          <Pencil
            size={20}
            className="cursor-pointer"
            onClick={() => setIsEditable(true)}
          />
        )}
      </div>

      <CvHeader
        name={backgroundInfo.name}
        bio={backgroundInfo.bio}
        avatarUrl={backgroundInfo.avatarUrl}
        hasProfileAccess={hasProfileAccess}
        id={backgroundInfo.id}
        identityId={backgroundInfo.identityId}
        isEditable={isEditable}
        onChange={({ name, bio, avatarUrl }) =>
          setBackgroundInfo((prev) => ({ ...prev, name, bio, avatarUrl }))
        }
      />
      <div className="md:grid md:grid-cols-[15rem_2fr]">
        <CvAside
          skills={background.skills}
          languages={background.languages}
          links={background.links}
          onChange={(skills, languages, links) => {
            // fix this
          }}
          isEditable={isEditable}
        />
        <CvMainContent isEditable={isEditable} />
      </div>
    </section>
  );
}
