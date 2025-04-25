"use client";

import { Button } from "@/components";
import { useToast } from "@/hooks/use-toast";
import DomToImage from "dom-to-image";
import jsPDF from "jspdf";
import { CheckCircle, Pencil, Printer } from "lucide-react";
import { useRef, useState } from "react";
import { updateCvAction } from "../../actions";
import { CvInfo } from "../../types";
import { CvAside } from "./cv-aside";
import { CvHeader } from "./cv-header";
import { CvMainContent } from "./cv-main-content";

type Props = {
  defaultCvInfo: CvInfo;
  hasProfileAccess: boolean;
};

export function CvContainer({ defaultCvInfo, hasProfileAccess }: Props) {
  const { toast } = useToast();

  const [isEditable, setIsEditable] = useState(false);
  const [cvInfo, setCvInfo] = useState(defaultCvInfo);
  const [isLoading, setIsLoading] = useState(false);

  const printRef = useRef<HTMLDivElement>(null);

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

  const handlePrint = async (
    userName: string,
    printRef: React.RefObject<HTMLDivElement>
  ) => {
    const element = printRef.current;
    if (element) {
      try {
        const cvElement = document.getElementById("cv");
        if (cvElement) cvElement.style.width = "900px";
        const cvArticleElement = document.getElementById("cv-article");
        if (cvArticleElement) {
          cvArticleElement.style.display = "grid";
          cvArticleElement.style.gridTemplateColumns = "15rem 2fr";
        }

        const scale = 2;
        const dataUrl = await DomToImage.toPng(element, {
          width: element.offsetWidth * scale,
          height: element.offsetHeight * scale,
          style: {
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width: `${element.offsetWidth}px`,
            height: `${element.offsetHeight}px`,
          },
        });

        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: [870, element.offsetHeight],
        });
        pdf.addImage(dataUrl, "PNG", 0, 0, 870, element.offsetHeight);

        if (cvElement) cvElement.style.width = "";
        if (cvArticleElement) {
          cvArticleElement.style.display = "";
          cvArticleElement.style.gridTemplateColumns = "";
        }

        pdf.save(`${userName}.pdf`);
      } catch (error) {
        console.error("Error generating image: ", error);
      }
    }
  };
  function handleLanguageChange(headerLanguage: string) {
    if (headerLanguage) {
      handleOnChange({ headerLanguage });
    }
  }
  return (
    <div className="flex flex-col items-center">
      <section className="flex items-center justify-end mt-4 w-full md:w-[900] mb-2">
        <div className="flex-grow">
          {isEditable && (
            <select
              className="w-fit text-sm"
              value={cvInfo.headerLanguage ? cvInfo.headerLanguage : "english"}
              onChange={(event) => {
                handleLanguageChange(event.target.value);
              }}
            >
              <option value="english" className="text-sm">
                English
              </option>
              <option value="swedish" className="text-sm">
                Svenska
              </option>
            </select>
          )}
        </div>
        {isEditable ? (
          <>
            <div className="flex gap-1 items-center ">
              {isLoading && (
                <div className="animate-spin h-5 w-5 border-2 border-t-transparent rounded-full border-blue-500" />
              )}
              <Button
                onClick={handleOnDiscard}
                disabled={isLoading}
                variant="ghost"
                size="sm"
                className="flex hover:bg-destructive/30 cursor-pointer "
              >
                Discard changes
              </Button>
              <Button
                onClick={() => handleOnSave(cvInfo)}
                disabled={isLoading}
                variant="default"
                size="sm"
                className="flex cursor-pointer"
              >
                <CheckCircle size={18} />
                Save
              </Button>
            </div>
          </>
        ) : (
          hasProfileAccess && (
            <Button
              onClick={() => setIsEditable(true)}
              variant="ghost"
              size="sm"
              className="flex cursor-pointer"

            >
              <Pencil size={20} className="cursor-pointer" />
              Edit
            </Button >
          )
        )}
        <Button
          onClick={() => handlePrint(cvInfo.name + " CV", printRef)}
          variant="ghost"
          size="sm"
          className="flex cursor-pointer"
        >
          <Printer />
          Print
        </Button>
      </section>
      <section id="cv" className="bg-white shadow-md md:w-[900]" ref={printRef}>
        <div className="py-2 px-2 bg-100 bg-cv-darkgray min-h-14 flex items-center justify-end">
          <p className="text-white text-3xl font-light mr-5 pr-10">
            {"</salt>"}
          </p>
        </div>
        <article
          id="cv-article"
          className="md:grid md:grid-cols-[15rem_2fr] bg-white"
        >
          <CvAside
            skills={cvInfo.skills}
            languages={cvInfo.languages}
            links={cvInfo.links}
            avatarUrl={cvInfo.avatarUrl}
            onChange={handleOnChange}
            isEditable={isEditable && !isLoading}
            headerLanguage={
              cvInfo.headerLanguage ? cvInfo.headerLanguage : "english"
            }
          />
          <section className="py-2 flex flex-col gap-2">
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
              headerLanguage={
                cvInfo.headerLanguage ? cvInfo.headerLanguage : "english"
              }
            />
          </section>
        </article>
      </section>
    </div>
  );
}
