import { DeveloperCard } from "@/components/ui/developer-card";
import { BackgroundCard, Projects, ScoreBoard } from "@/features";

// Maximum timeout duration for the page speed API
export const maxDuration = 60;

type Params = {
  params: Promise<{ slug: string }>;
};

export default async function DeveloperDetailPage({ params }: Params) {
  const { slug } = await params;

  console.log({ slug: slug });

  return (
    <DeveloperCard>
      <BackgroundCard slug={slug} />
      <ScoreBoard cohortId={"927d9e82-c0b1-4561-ac04-75883d7b01ae"} />
      {/* Hard coded cohortId? */}
      <Projects slug={slug} />
    </DeveloperCard>
  );
}
