import { DeveloperCard } from "@/components/ui/developer-card";
import { BackgroundCard, developerService } from "@/features";
import { Projects } from "@/features";
import { ScoreBoard } from "@/features/scores";

type Params = {
  params: Promise<{ slug: string }>;
};

export default async function DeveloperDetailPage({ params }: Params) {
  const { slug } = await params; // slug
  const devid = await developerService.getIdBySlug(slug);
  
  return (
    <DeveloperCard>
      <BackgroundCard devid={devid} />
      <ScoreBoard devId={devid} />
      <Projects devId={devid} />
    </DeveloperCard>
  );
}
