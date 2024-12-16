import { DeveloperCard } from "@/components/ui/developer-card";
import { Background } from "@/features/backgrounds/components";
import { Projects } from "@/features";
import { ScoreBoard } from "@/features/scores";

export default async function DeveloperDetailPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  return (
    <>
      <DeveloperCard>
        <Background id={1} />
        <ScoreBoard />
        <Projects userId={(await params).userId} />
      </DeveloperCard>
    </>
  );
}
