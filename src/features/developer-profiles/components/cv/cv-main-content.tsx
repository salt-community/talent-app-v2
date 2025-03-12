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
      organization: "University of Technology",
      date: "2020 - 2024",
      role: "Bachelor of Science in Computer Science",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ]);
  const [jobs, setJobs] = useState([
    {
      id: 1,
      organization: "Tech Company",
      date: "2022 - Present",
      role: "Software Engineer",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ]);

  return (
    <div>
      <div className="flex justify-between">
        <H2 textColor="text-paragraph">Education and training</H2>
        {isEditable && (
          <Button
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
      <div className="flex flex-col gap-4">
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
            onChange={(education) => setEducations((prev) => prev.map((e) => e.id === education.id ? education : e))}
          />
        ))}
      </div>
      <div className="flex justify-between">
        <H2 textColor="text-paragraph">Work experience</H2>
        {isEditable && (
          <Button
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
      <div className="flex flex-col gap-4">
        {jobs.map((job) => (
          <CvBlock
            key={job.id}
            experience={job}
            isEditable={isEditable}
            onDelete={() => {
              setJobs((prev) => prev.filter((e) => e.id !== job.id));
            }}
            onChange={(job) => setEducations((prev) => prev.map((e) => e.id === job.id ? job : e))}

          />
        ))}
      </div>
    </div>
  );
}
