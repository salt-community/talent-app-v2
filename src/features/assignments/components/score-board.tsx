import { Separator, H2 } from "@/components/ui";
import { AverageScore } from "./average-score";
import { assignmentsService } from "@/features";
import { SpiderGraph } from "./spider-graph";

type ScoreBoardProps = {
  identityId: string;
};

export async function ScoreBoard({ identityId }: ScoreBoardProps) {
  return (
    <section className="min-w-72">
      <Separator className="my-4" />
      <H2>Salt Scoring</H2>

      <AverageScore identityId={identityId} />
      <SpiderGraph identityId={identityId} />
    </section>
  );
}
