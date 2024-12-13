import { DeveloperCard } from "@/components/ui/developer-card";
import { Background } from "@/features/backgrounds/components";
import { Projects } from "@/features";
import { ScoreBoard } from "@/features/scores";

type Props = {
  params: { id: string };
};

export default async function DeveloperDetailPage({ params }: Props) {
  return (
    <>
      <DeveloperCard>
        <Background id={1} />
        <ScoreBoard />
        <Projects id={params.id} />
      </DeveloperCard>
    </>
  );
}
