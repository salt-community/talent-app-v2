import { DeveloperCard } from "@/components/ui/developer-card";
import { Background } from "@/features/backgrounds/components";
import { Projects } from "@/features";
import { ScoreBoard } from "@/features/scores";

export default function Home() {
  return (
    <>
      <DeveloperCard>
        <Background id={1} />
        <ScoreBoard />
        <Projects userId={"1"} />
      </DeveloperCard>
    </>
  );
}
