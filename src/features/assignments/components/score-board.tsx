import { Separator, H2 } from "@/components/ui";
import { AverageScore } from "./average-score";
import { SpiderGraph } from "./spider-graph";
import { Assignments } from "./accordion";
import { assignmentsService } from "../instance";

type ScoreBoardProps = {
  cohortId: string;
};

export async function ScoreBoard({ cohortId }: ScoreBoardProps) {
  const assignments =
    await assignmentsService.getAssignmentsByCohortId(cohortId);

  return (
    <section className="min-w-72">
      <Separator className="my-4" />
      <H2>Salt Scoring</H2>

      <AverageScore assignments={assignments} />
      <SpiderGraph assignments={assignments} />
      <Assignments />
    </section>
  );
}
