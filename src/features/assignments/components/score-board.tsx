import { Separator, H2 } from "@/components/ui";
import { AverageScore } from "./average-score";
import { SpiderGraph } from "./spider-graph";
import { assignmentsService } from "../instance";

type ScoreBoardProps = {
  identityId: string;
};

export async function ScoreBoard({ identityId }: ScoreBoardProps) {
  const AverageScoresByCategory =
    await assignmentsService.getAllAverageScoresByIdentityId(identityId);
  return (
    <section className="min-w-72">
      <Separator className="my-4" />
      <H2>Salt Scoring</H2>

      <AverageScore identityId={identityId} />
      <SpiderGraph AverageScoresByCategory={AverageScoresByCategory} />
    </section>
  );
}
