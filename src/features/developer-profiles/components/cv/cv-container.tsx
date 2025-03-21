"use client";

import { useState } from "react";
import { CvAside } from "./cv-aside";
import { CvHeader } from "./cv-header";
import { CvInfo } from "../../types";
import { CheckCircle, Pencil } from "lucide-react";
import { updateCvAction } from "../../actions";
import { CvMainContent } from "./cv-main-content";
import { Button } from "@/components";
import { useToast } from "@/hooks/use-toast";

type Props = {
  defaultCvInfo: CvInfo;
  hasProfileAccess: boolean;
};

export function CvContainer({ defaultCvInfo, hasProfileAccess }: Props) {
  const { toast } = useToast();

  const [isEditable, setIsEditable] = useState(false);
  const [cvInfo, setCvInfo] = useState(defaultCvInfo);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (data: Partial<CvInfo>) => {
    setCvInfo((prev) => ({ ...prev, ...data }));
  };

  const handleOnSave = async (cvInfo: CvInfo) => {
    setIsLoading(true);
    const hasEmptyFields = [...cvInfo.jobs, ...cvInfo.educations].some(
      (experience) =>
        [
          experience.role,
          experience.organization,
          experience.date,
          experience.description,
        ].some((value) => value.trim() === "")
    );
    if (hasEmptyFields) {
      toast({
        title: "Could not save",
        description: "Please fill in all fields",
      });
      setIsLoading(false);
      return;
    }
    await updateCvAction(cvInfo);
    toast({
      title: "Success",
      description: "CV updated successfully",
    });
    setIsLoading(false);
    setIsEditable(false);
  };

  const handleOnDiscard = () => {
    setCvInfo(defaultCvInfo);
    setIsEditable(false);
  };

  return (
    <section className="py-6 my-4 md:py-0 md:mx-8 lg:mx-32 xl:mx-64 2xl:mx-100 shadow-md">
      <div className="flex items-center justify-end py-2 px-2 bg-100 bg-zinc-100 min-h-14">
        {isEditable ? (
          <div className="flex gap-1 items-center ">
            {isLoading && (
              <div className="animate-spin h-5 w-5 border-2 border-t-transparent rounded-full border-blue-500" />
            )}
            <Button
              onClick={handleOnDiscard}
              disabled={isLoading}
              variant="ghost"
              size="sm"
              className="flex hover:bg-destructive/30 "
            >
              Discard changes
            </Button>
            <Button
              onClick={() => handleOnSave(cvInfo)}
              disabled={isLoading}
              variant="default"
              size="sm"
              className="flex"
            >
              <CheckCircle size={20} />
              Save
            </Button>
          </div>
        ) : (
          hasProfileAccess && (
            <Button
              onClick={() => setIsEditable(true)}
              variant="ghost"
              size="sm"
              className="flex"
            >
              <Pencil size={20} />
              Edit
            </Button>
          )
        )}
      </div>

      <article className="md:grid md:grid-cols-[15rem_2fr]">
        <CvAside
          skills={cvInfo.skills}
          languages={cvInfo.languages}
          links={cvInfo.links}
          avatarUrl={cvInfo.avatarUrl}
          onChange={handleOnChange}
          isEditable={isEditable && !isLoading}
        />
        <section className="py-4 flex flex-col gap-2">
          <CvHeader
            name={cvInfo.name}
            bio={cvInfo.bio}
            hasProfileAccess={hasProfileAccess}
            id={cvInfo.id}
            identityId={cvInfo.identityId}
            isEditable={isEditable && !isLoading}
            onChange={handleOnChange}
          />
          <CvMainContent
            isEditable={isEditable && !isLoading}
            jobs={cvInfo.jobs}
            educations={cvInfo.educations}
            onChange={handleOnChange}
          />
        </section>
      </article>
    </section>
  );
}
