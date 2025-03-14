import { Button, H2 } from "@/components";
import { CvBlock } from "./cv-block";
import { Plus } from "lucide-react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

type Props = {
  isEditable: boolean;
  jobs: Experience[];
  onChange: (jobs: Experience[]) => void;
};

export type Experience = {
  id: string;
  organization: string;
  date: string;
  role: string;
  description: string;
};

export function CvMainContent({ isEditable, jobs, onChange }: Props) {
  const [educations, setEducations] = useState([
    {
      id: "first",
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
        <H2 textColor="text-paragraph px-1 py-1 border border-transparent">
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
                  id: uuidv4(),
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
                prev.filter((e) => e.id !== education.id)
              );
            }}
            onChange={(education) =>
              setEducations((prev) =>
                prev.map((e) => (e.id === education.id ? education : e))
              )
            }
            onMoveUp={() => {
              const index = educations.findIndex((e) => e.id === education.id);
              if (index > 0) {
                const newEducations = [...educations];
                [newEducations[index - 1], newEducations[index]] = [
                  newEducations[index],
                  newEducations[index - 1],
                ];
                setEducations(newEducations);
              } else {
                return;
              }
            }}
            onMoveDown={() => {
              const index = educations.findIndex((e) => e.id === education.id);
              if (index < educations.length - 1) {
                const newEducations = [...educations];
                [newEducations[index], newEducations[index + 1]] = [
                  newEducations[index + 1],
                  newEducations[index],
                ];
                setEducations(newEducations);
              } else {
                return;
              }
            }}
          />
        ))}
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
            onClick={() => {
              const newJobs = [
                ...jobs,
                {
                  id: uuidv4(),
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
            onMoveUp={() => {
              const index = jobs.findIndex((e) => e.id === job.id);
              if (index > 0) {
                const newJobs = [...jobs];
                [newJobs[index - 1], newJobs[index]] = [
                  newJobs[index],
                  newJobs[index - 1],
                ];
                onChange(newJobs);
              } else {
                return;
              }
            }}
            onMoveDown={() => {
              const index = jobs.findIndex((e) => e.id === job.id);
              if (index < jobs.length - 1) {
                const newJobs = [...jobs];
                [newJobs[index], newJobs[index + 1]] = [
                  newJobs[index + 1],
                  newJobs[index],
                ];
                onChange(newJobs);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}
