"use client";

import { useState } from "react";
import { CvAside } from "./cv-aside";
import { CvHeader } from "./cv-header";
import { CvInfo } from "../../types";
import { CheckCircle, Pencil } from "lucide-react";
import { updateCvAction } from "../../actions";
import { CvMainContent } from "./cv-main-content";
import { Button } from "@/components";

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

  const handleOnDiscard = () => {
    setCvInfo(defaultCvInfo);
    setIsEditable(false);
  };

  return (
    <section className="py-6 my-4 md:py-0 md:mx-8 lg:mx-32 xl:mx-64 2xl:mx-100 shadow-md">
      <div className="flex items-center justify-between py-2 px-2">
        <p className="hidden md:block text-start">{"</salt>"}</p>
        {isEditable ? (
          <div className="flex gap-1">
            <Button
              onClick={handleOnDiscard}
              variant="ghost"
              size="sm"
              className="flex hover:bg-destructive/30"
            >
              Discard changes
            </Button>
            <Button
              onClick={() => handleOnSave(cvInfo)}
              variant="secondary"
              size="sm"
              className="flex hover:bg-green-200"
            >
              <CheckCircle size={20} />
              Save
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => setIsEditable(true)}
            variant="ghost"
            size="sm"
            className="flex"
          >
            <Pencil size={20} />
            Edit
          </Button>
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
          onChange={(data) => {
            setCvInfo((prev) => ({
              ...prev,
              ...data,
            }));
          }}
          isEditable={isEditable}
        />
        <CvMainContent isEditable={isEditable} />
      </div>
    </section>
  );
}
