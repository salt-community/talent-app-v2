import { Button } from "@/components";
import { ExperienceDetails } from "./experience-details";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { Experience } from "../../types";
import { validateEducationOrder } from "../../logic";

type Props = {
  isEditable: boolean;
  experiences: Experience[];
  onChange: (experiences: Experience[]) => void;
};

export function ExperienceList({ isEditable, experiences, onChange }: Props) {
  const sortedExperinces = experiences.sort((a, b) => a.order - b.order);

  console.log({ sorted: sortedExperinces });
  const handleOnChange = (index: number, experience: Experience) => {
    const updatedExperiences = experiences.map((e, i) =>
      i === index ? experience : e
    );

    onChange(validateEducationOrder(updatedExperiences));
  };

  const handleDelete = (index: number) =>
    onChange(experiences.filter((_, i) => i !== index));

  const switchPositions = (fromIndex: number, toIndex: number) => {
    const exps = [...experiences];
    [exps[fromIndex], exps[toIndex]] = [exps[toIndex], exps[fromIndex]];
    exps.forEach((exp, index) => {
      exp.order = index + 1;
    });
    onChange(exps);
  };

  const handleMoveUp = (index: number) => switchPositions(index, index - 1);
  const handleMoveDown = (index: number) => switchPositions(index, index + 1);

  return (
    <div className="flex flex-col gap-4">
      {sortedExperinces.map((experience, index) => (
        <div key={experience.id} className="flex items-start justify-between">
          <ExperienceDetails
            key={experience.id}
            experience={experience}
            isEditable={isEditable}
            onChange={(experience) => handleOnChange(index, experience)}
          />
          {isEditable && (
            <div className="flex flex-col gap-1">
              <Button
                variant="link"
                size="icon"
                onClick={() => handleDelete(index)}
                className="h-5 w-5 cursor-pointer"
              >
                <X size={56} className="cursor-pointer" />
              </Button>
              {index > 0 && (
                <Button
                  variant="link"
                  size="icon"
                  onClick={() => handleMoveUp(index)}
                  className="h-5 w-5 cursor-pointer"
                >
                  <ChevronUp size={56} className="cursor-pointer" />
                </Button>
              )}
              {index < experiences.length - 1 && (
                <Button
                  variant="link"
                  size="icon"
                  onClick={() => handleMoveDown(index)}
                  className="h-5 w-5 cursor-pointer"
                >
                  <ChevronDown size={56} className="cursor-pointer" />
                </Button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
