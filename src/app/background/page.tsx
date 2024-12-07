import { DeveloperCard } from "@/components/ui/developer-card";
import { Background } from "@/features/background/ui";

export default function Page() {
  return (
    <>
      <DeveloperCard>
        <Background developer={mockDeveloper} />
      </DeveloperCard>
    </>
  );
}

const mockDeveloper = {
  name: "John Doe",
  title: "Software Engineer",
  bio: "I'm a software engineer with 5 years of experience",
  avatarURL: "https://avatars.githubusercontent.com/u/1?v=4",
  languages: ["JavaScript", "TypeScript", "Python"],
  educations: ["BSc in Computer Science"],
  skills: [
    "React",
    "Next.js",
    "Node.js",
    "Django",
    "Tailwind CSS",
    "PostgreSQL",
  ],
  links: [
    {
      name: "Github" as "Github" | "LinkedIn",
      url: "https://github.com/johndoe",
    },
    {
      name: "LinkedIn" as "Github" | "LinkedIn",
      url: "https://linkedin.com/johndoe",
    },
  ],
};
