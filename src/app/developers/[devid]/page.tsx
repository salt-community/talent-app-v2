import { DeveloperCard } from "@/components/ui/developer-card";
import { Background } from "@/features/backgrounds/components";
import { Projects } from "@/features";
import { ScoreBoard } from "@/features/scores";

type Params = {
  params: Promise<{ devid: string }>;
};

export default async function DeveloperDetailPage({ params }: Params) {
  const { devid } = await params;

  return (
    <DeveloperCard>
      <Background devid={devid} />
      <ScoreBoard devId={devid} />
      <Projects devId={devid} />
    </DeveloperCard>
  );
}
