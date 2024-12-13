import { DeveloperCard } from "@/components/ui/developer-card";
import { Background } from "@/features/backgrounds/components";
import { Projects } from "@/features";
import { ScoreBoard } from "@/features/scores";


export default async function DeveloperDetailPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  return (
    <>
      <DeveloperCard>
        <Background uuid={userId} />
        <ScoreBoard />
        <Projects userId={userId} />
      </DeveloperCard>
    </>
  );
}
