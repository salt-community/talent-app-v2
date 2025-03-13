"use client";

import { useState } from "react";
import { CvAside } from "./cv-aside";
import { CvHeader } from "./cv-header";
import { CvInfo } from "../../types";
import { Check, Pencil } from "lucide-react";
import { updateCvAction } from "../../actions";
import { CvMainContent } from "./cv-main-content";

type Props = {
  defaultCvInfo: CvInfo;
  hasProfileAccess: boolean;
};

export function CvContainer({ defaultCvInfo, hasProfileAccess }: Props) {
  const [isEditable, setIsEditable] = useState(false);
  const [cvInfo, setCvInfo] = useState(defaultCvInfo);

  const handleOnSave = async (cvInfo: CvInfo) => {
    await updateCvAction(cvInfo);
    setIsEditable(false);
  };

  return (
    <section className="border-red-800 border-2 py-6 md:py-0 md:mx-auto md:min-h-[1122px] md:max-h-[1122px]  md:min-w-[795px] md:max-w-[795px]">
      <div className="flex items-center justify-between py-3 font-bold mx-2">
        <p className="hidden md:block text-start">{"</salt>"}</p>
        {isEditable ? (
          <Check
            onClick={() => handleOnSave(cvInfo)}
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
        name={cvInfo.name}
        bio={cvInfo.bio}
        avatarUrl={cvInfo.avatarUrl}
        hasProfileAccess={hasProfileAccess}
        id={cvInfo.id}
        identityId={cvInfo.identityId}
        isEditable={isEditable}
        onChange={({ name, bio, avatarUrl }) =>
          setCvInfo((prev) => ({ ...prev, name, bio, avatarUrl }))
        }
      />
      <div className="md:grid md:grid-cols-[15rem_2fr]">
        <CvAside
          skills={cvInfo.skills}
          languages={cvInfo.languages}
          links={cvInfo.links}
          onChange={(skills, languages, links) => {
            setCvInfo((prev) => ({
              ...prev,
              skills,
              languages,
              links,
            }));
          }}
          isEditable={isEditable}
        />
        <CvMainContent isEditable={isEditable} />
      </div>
    </section>
  );
}
