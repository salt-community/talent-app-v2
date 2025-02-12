import { Separator, H2 } from "@/components/ui";
import { assignmentsService } from "../instance";

type ScoreBoardProps = {
  cohortId: string;
};

export async function ScoreBoard({ cohortId }: ScoreBoardProps) {
  await assignmentsService.getAssignmentsByCohortId(cohortId);

  return (
    <section className="min-w-72">
      <Separator className="my-4" />
      <H2>Salt Scoring</H2>

      {/* <AverageScore assignments={assignments} />
      <SpiderGraph assignments={assignments} /> */}
    </section>
  );
}
