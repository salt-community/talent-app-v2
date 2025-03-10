"use client";

import { useState } from "react";
import { CvAside } from "./cv-aside";
import { CvHeader } from "./cv-header";
import { BackgroundInfo } from "../../types";
import { Check, Pencil } from "lucide-react";

type Props = {
  background: BackgroundInfo;
  hasProfileAccess: boolean;
};

export function CvContainer({ background, hasProfileAccess }: Props) {
  const [isEditable, setIsEditable] = useState(false);
  const [backgroundInfo, setBackgroundInfo] = useState(background);
  const handleOnSave = async (background: BackgroundInfo) => {
    console.log(background)
    setIsEditable(false)
  }

  return (
    <section className="border-red-800 border-2 py-6 md:py-0 md:mx-auto md:min-h-[1122px] md:max-h-[1122px]  md:min-w-[795px] md:max-w-[795px]">
      <div className="hidden md:block text-end py-3 pr-4 bg-zinc-100 font-bold">
        {"</salt>"}
      </div>
      {isEditable ? (
        <Check onClick={() => handleOnSave(backgroundInfo)} />
      ) : (
        <Pencil
          size={20}
          className="cursor-pointer"
          onClick={() => setIsEditable(true)}
        />
      )}
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
        />
        <div className="md:col-start-2 md:col-end-3 px-3 py-6">
          <h2 className="text-xl font-bold">Education</h2>
          <h2 className="text-xl font-bold">Work Experience</h2>
        </div>
      </div>
    </section>
  );
}
