import { DeveloperCard } from "@/components/ui/developer-card";
import { Background } from "@/features/backgrounds/components";
import { Projects } from "@/features";
import { ScoreBoard } from "@/features/scores";

export default async function DeveloperDetailPage({
  params,
}: {
  params: Promise<{ devId: string }>;
}) {
  const { devId } = await params;
  return (
    <>
      <DeveloperCard>
        <Background devId={devId} />
        <ScoreBoard />
        <Projects userId={devId} />
      </DeveloperCard>
    </>
  );
}
