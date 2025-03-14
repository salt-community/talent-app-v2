import { Button, H2 } from "@/components";
import { CvBlock } from "./cv-block";
import { Plus } from "lucide-react";
import { useState } from "react";

type Props = {
  isEditable: boolean;
};

export type Experience = {
  id: number;
  organization: string;
  date: string;
  role: string;
  description: string;
};

export function CvMainContent({ isEditable }: Props) {
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
  const [jobs, setJobs] = useState([
    {
      id: 1,
      organization: "Salt",
      date: "2025 - Present",
      role: "Fullstack Developer",
      description:
        "Hands-on development in the Talent App, a platform designed to connect developers with job opportunities. Involves building and optimizing fullstack features using JavaScript, TypeScript, React, Next.js, Node.js, and PostgreSQL. Collaboration is key, with daily Agile practices, Mob Programming sessions, code reviews, and CI/CD workflows. Responsibilities include implementing authentication with Clerk, managing database schemas with Drizzle ORM, and improving search functionality with MeiliSearch. A focus on performance, accessibility, and developer experience ensures continuous improvement in a flexible, remote-friendly environment."
    }
    ,
  ]);

  return (
    <div>
      <div className="flex justify-between px-2">
        <H2 textColor="text-paragraph px-1 border border-transparent">
          Education and training
        </H2>
        {isEditable && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setEducations((prev) => [
                ...prev,
                {
                  id: prev.length + 1,
                  organization: "School name",
                  date: "xxxx - xxxx",
                  role: "Education title",
                  description: "Education description",
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
          />
        ))}
      </div>
      <div className="flex justify-between px-2">
        <H2 textColor="text-paragraph px-1 border border-transparent">
          Work experience
        </H2>
        {isEditable && (
          <Button
            variant="default"
            size="icon"
            className="h-5 w-5 rounded-full"
            onClick={() => {
              setJobs((prev) => [
                ...prev,
                {
                  id: prev.length + 1,
                  organization: "Company name",
                  date: "xxxx - xxxx",
                  role: "Job title",
                  description: "Job description",
                },
              ]);
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
              setJobs((prev) => prev.filter((e) => e.id !== job.id));
            }}
            onChange={(job) =>
              setJobs((prev) => prev.map((e) => (e.id === job.id ? job : e)))
            }
          />
        ))}
      </div>
    </div>
  );
}
