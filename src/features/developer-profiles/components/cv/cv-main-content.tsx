import { Button, H2 } from "@/components";
import { CvBlock } from "./cv-block";
import { Plus } from "lucide-react";
import { useState } from "react";

type Props = {
  isEditable: boolean;
};
export function CvMainContent({ isEditable }: Props) {
  const [educations, setEducations] = useState([
    {
      id: 1,
      school: "University of Technology",
      date: "2020 - 2024",
      title: "Bachelor of Science in Computer Science",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ]);
  const [workExperiences, setWorkExperiences] = useState([
    {
      id: 1,
      company: "Tech Company",
      date: "2022 - Present",
      title: "Software Engineer",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ]);

  return (
    <div>
      <div className="flex justify-between">
        <H2>Education and training</H2>
        <Button
          onClick={() => {
            setEducations((prev) => [
              ...prev,
              {
                id: prev.length + 1,
                school: "School name",
                date: "xxxx - xxxx",
                title: "Education title",
                description: "Education description",
              },
            ]);
          }}
        >
          <Plus />
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        {educations.map((education) => (
          <CvBlock
            key={education.id}
            school={education.school}
            date={education.date}
            title={education.title}
            description={education.description}
            isEditable={isEditable}
            onDelete={() => {
              setEducations((prev) =>
                prev.filter((e) => e.id !== education.id),
              );
            }}
          />
        ))}
      </div>
      <div className="flex justify-between">
        <H2>Work experience</H2>
        <Button
          onClick={() => {
            setWorkExperiences((prev) => [
              ...prev,
              {
                id: prev.length + 1,
                company: "Company name",
                date: "xxxx - xxxx",
                title: "Job title",
                description: "Job description",
              },
            ]);
          }}
        >
          <Plus />
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        {workExperiences.map((experience) => (
          <CvBlock
            key={experience.id}
            school={experience.company}
            date={experience.date}
            title={experience.title}
            description={experience.description}
            isEditable={isEditable}
            onDelete={() => {
              setWorkExperiences((prev) =>
                prev.filter((e) => e.id !== experience.id),
              );
            }}
          />
        ))}
      </div>
    </div>
  );
}
