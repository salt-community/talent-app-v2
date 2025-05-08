import { Button, H2 } from "@/components";
import { Plus } from "lucide-react";
import { v4 } from "uuid";
import { ExperienceList } from "./experience-list";
import { Experience } from "../../types";

type Props = {
  isEditable: boolean;
  jobs: Experience[];
  educations: Experience[];
  onChange: (data: { jobs: Experience[]; educations: Experience[] }) => void;
  headerLanguage: string;
};

export function CvMainContent({
  isEditable,
  jobs,
  educations,
  onChange,
  headerLanguage,
}: Props) {
  const createEmptyExperience = () => ({
    id: v4(),
    organization: "",
    date: "",
    role: "",
    description: "",
    order: 0,
  });

  return (
    <div className="pb-8">
      <div className="flex items-center justify-between px-2">
        <H2 textColor="px-1 py-1 border border-transparent text-nowrap text-brand-orange">
          {headerLanguage === "english"
            ? "Education and training"
            : "Utbildning och träning"}
        </H2>
        {isEditable && (
          <Button
            variant="default"
            size="icon"
            className="h-5 w-5 rounded-full cursor-pointer"
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
        <H2 textColor="text-brand-orange px-1 py-1 border border-transparent text-nowrap">
          {headerLanguage === "english"
            ? "Work experience"
            : "Arbetslivserfarenhet"}
        </H2>
        {isEditable && (
          <Button
            variant="default"
            size="icon"
            className="h-5 w-5 rounded-full cursor-pointer"
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
