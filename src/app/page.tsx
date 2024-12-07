import { DeveloperCard } from "@/components/ui/developer-card";
import { Background } from "@/features/background/ui";
import { ProjectCard } from "@/features/projects/components/project-card";
import { ScoreBoard } from "@/features/scores";

export default function Home() {
  return (
    <>
      <DeveloperCard>
        <Background />
        <ScoreBoard />
        <ProjectCard />
      </DeveloperCard>
    </>
  );
}
