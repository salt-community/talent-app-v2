import { DeveloperCard } from "@/components/ui/developer-card";
import { ScoreBoard } from "@/features";

// Maximum timeout duration for the page speed API
export const maxDuration = 60;

type Params = {
  params: Promise<{ cohortId: string }>;
};

export default async function DeveloperDetailPage({ params }: Params) {
  const { cohortId } = await params;

  return (
    <DeveloperCard>
      {/* <BackgroundCard devid={devId} /> */}
      {process.env.FF_SCORES === "ON" && <ScoreBoard cohortId={cohortId} />}
      {/* <Projects devId={devId} /> */}
    </DeveloperCard>
  );
}
