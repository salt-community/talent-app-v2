import { DeveloperCard } from "@/components/ui/developer-card";
import { BackgroundCard, Projects, ScoreBoard } from "@/features";

// Maximum timeout duration for the page speed API
export const maxDuration = 60;

type Params = {
  params: Promise<{ developerProfileId: string }>;
};

export default async function DeveloperDetailPage({ params }: Params) {
  const { developerProfileId } = await params;
  return (
    <DeveloperCard>
      <BackgroundCard developerProfileId={developerProfileId} />
      <ScoreBoard cohortId={"927d9e82-c0b1-4561-ac04-75883d7b01ae"} />
      <Projects developerProfileId={developerProfileId} />
    </DeveloperCard>
  );
}
