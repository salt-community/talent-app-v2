import { DeveloperCard } from "@/components/ui/developer-card";
import { Background, Projects } from "@/features";

// Maximum timeout duration for the page speed API
export const maxDuration = 60;

type Params = {
  params: Promise<{ developerProfileId: string }>;
};

export default async function DeveloperDetailPage({ params }: Params) {
  const { developerProfileId } = await params;
  return (
    <DeveloperCard>
      <Background developerProfileId={developerProfileId} />
      <Projects developerProfileId={developerProfileId} />
    </DeveloperCard>
  );
}
