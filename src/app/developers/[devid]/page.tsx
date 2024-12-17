import { DeveloperCard } from "@/components/ui/developer-card";
import { BackgroundCard } from "@/features/backgrounds/components/background-card";
import { Projects } from "@/features";
import { ScoreBoard } from "@/features/scores";

type Params = {
  params: Promise<{ devid: string }>;
};

export default async function DeveloperDetailPage({ params }: Params) {
  const { devid } = await params;

  return (
    <DeveloperCard>
      <BackgroundCard devid={devid} />
      <ScoreBoard devId={devid} />
      <Projects devId={devid} />
    </DeveloperCard>
  );
}
