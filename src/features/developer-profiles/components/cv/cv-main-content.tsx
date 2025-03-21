import { Button, H2 } from "@/components";
import { Plus } from "lucide-react";
import { v4 } from "uuid";
import { ExperienceList } from "./experience-list";

type Props = {
  isEditable: boolean;
  jobs: Experience[];
  educations: Experience[];
  onChange: (data: { jobs: Experience[]; educations: Experience[] }) => void;
};

export type Experience = {
  id: string;
  organization: string;
  date: string;
  role: string;
  description: string;
};

export function CvMainContent({
  isEditable,
  jobs,
  educations,
  onChange,
}: Props) {
  const createEmptyExperience = () => ({
    id: v4(),
    organization: "",
    date: "",
    role: "",
    description: "",
  });

  return (
    <div className="pb-8">
      <div className="flex items-center justify-between px-2">
        <H2 textColor="text-paragraph px-1 py-1 border border-transparent">
          Education and training
        </H2>
        {isEditable && (
          <Button
            variant="default"
            size="icon"
            className="h-5 w-5 rounded-full"
            onClick={() =>
              onChange({
                educations: [...educations, createEmptyExperience()],
                jobs,
              })
            }
          >
            <Plus />
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-2 px-2">
        <ExperienceList
          isEditable={isEditable}
          experiences={educations}
          onChange={(educations) => onChange({ educations, jobs })}
        />
      </div>
      <div className="flex justify-between items-center px-2">
        <H2 textColor="text-paragraph px-1 py-1 border border-transparent">
          Work experience
        </H2>
        {isEditable && (
          <Button
            variant="default"
            size="icon"
            className="h-5 w-5 rounded-full"
            onClick={() =>
              onChange({ jobs: [...jobs, createEmptyExperience()], educations })
            }
          >
            <Plus />
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-4 px-2 ">
        <ExperienceList
          isEditable={isEditable}
          experiences={jobs}
          onChange={(jobs) => onChange({ jobs, educations })}
        />
      </div>
    </div>
  );
}
