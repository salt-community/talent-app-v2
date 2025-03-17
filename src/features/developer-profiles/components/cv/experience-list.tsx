import { Button } from "@/components";
import { CvBlock } from "./cv-block";
import { Experience } from "./cv-main-content";
import { ChevronDown, ChevronUp, X } from "lucide-react";

type Props = {
  isEditable: boolean;
  experiences: Experience[];
  onChange: (experiences: Experience[]) => void;
};

export function ExperienceList({ isEditable, experiences, onChange }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {experiences.map((experience, index) => (
        <div key={experience.id} className="flex items-start justify-between">
          <CvBlock
            key={experience.id}
            experience={experience}
            isEditable={isEditable}
            onChange={(experience) =>
              onChange(
                experiences.map((e, i) => (i === index ? experience : e)),
              )
            }
          />
          {isEditable && (
            <div className="flex flex-col gap-1">
              <Button
                variant="link"
                size="icon"
                onClick={() =>
                  onChange(experiences.filter((_, i) => i !== index))
                }
                className="h-5 w-5"
              >
                <X size={56} className="cursor-pointer" />
              </Button>
              <Button
                variant="link"
                size="icon"
                onClick={() => {
                  const newExperiences = [...experiences];
                  [newExperiences[index], newExperiences[index - 1]] = [
                    newExperiences[index - 1],
                    newExperiences[index],
                  ];
                  onChange(newExperiences);
                }}
                className="h-5 w-5"
              >
                <ChevronUp size={56} className="cursor-pointer" />
              </Button>
              <Button
                variant="link"
                size="icon"
                onClick={() => {
                  const newExperiences = [...experiences];
                  [newExperiences[index], newExperiences[index + 1]] = [
                    newExperiences[index + 1],
                    newExperiences[index],
                  ];
                  onChange(newExperiences);
                }}
                className="h-5 w-5"
              >
                <ChevronDown size={56} className="cursor-pointer" />
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
