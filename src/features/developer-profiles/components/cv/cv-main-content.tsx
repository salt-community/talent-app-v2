import { Button, H2 } from "@/components";
import { CvBlock } from "./cv-block";
import { Plus } from "lucide-react";
import { useState } from "react";

type Props = {
  isEditable: boolean;
  jobs: Experience[];
  onChange: (jobs: Experience[]) => void;
};

export type Experience = {
  id: number;
  organization: string;
  date: string;
  role: string;
  description: string;
};

export function CvMainContent({ isEditable, jobs, onChange }: Props) {
  const [educations, setEducations] = useState([
    {
      id: 1,
      organization: "Salt",
      date: "Jan 2025 - Apr 2025",
      role: "Fullstack JavaScript Developer",
      description:
        "Accelerated fullstack program covering JavaScript, TypeScript, React, Next.js, Node.js, and PostgreSQL. Hands-on experience with Agile, TDD, Mob Programming, and CI/CD. Developed technical and soft skills through collaborative projects and leadership training.",
    },
  ]);

  return (
    <div className="pb-8">
      <div className="flex items-center justify-between px-2">
        <H2 textColor="text-paragraph px-1 border border-transparent">
          Education and training
        </H2>
        {isEditable && (
          <Button
          variant="default"
          size="icon"
          className="h-5 w-5 rounded-full"
            onClick={() => {
              setEducations((prev) => [
                ...prev,
                {
                  id: prev.length + 1,
                  organization: "",
                  date: "",
                  role: "",
                  description: "",
                },
              ]);
            }}
          >
            <Plus />
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-2 px-2">
        {educations.map((education) => (
          <CvBlock
            key={education.id}
            experience={education}
            isEditable={isEditable}
            onDelete={() => {
              setEducations((prev) =>
                prev.filter((e) => e.id !== education.id),
              );
            }}
            onChange={(education) =>
              setEducations((prev) =>
                prev.map((e) => (e.id === education.id ? education : e)),
              )
            }
          />
        ))}
      </div>
      <div className="flex justify-between items-center px-2">
        <H2 textColor="text-paragraph px-1 border border-transparent">
          Work experience
        </H2>
        {isEditable && (
          <Button
            variant="default"
            size="icon"
            className="h-5 w-5 rounded-full"
            onClick={() => {
              const newJobs = [
                ...jobs,
                {
                  id: jobs.length + 1,
                  organization: "",
                  date: "",
                  role: "",
                  description: "",
                },
              ];
              onChange(newJobs);
            }}
          >
            <Plus />
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-4 px-2 ">
        {jobs.map((job) => (
          <CvBlock
            key={job.id}
            experience={job}
            isEditable={isEditable}
            onDelete={() => {
              onChange(jobs.filter((e) => e.id !== job.id));
            }}
            onChange={(job) =>
              onChange(jobs.map((e) => (e.id === job.id ? job : e)))
            }
          />
        ))}
      </div>
    </div>
  );
}
