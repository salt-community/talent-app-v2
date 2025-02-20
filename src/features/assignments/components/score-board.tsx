import { Separator, H2 } from "@/components/ui";
import { assignmentsService } from "../instance";

type ScoreBoardProps = {
  cohortId: string;
  hasProfileAccess: boolean;
};

export async function ScoreBoard({
  cohortId,
  hasProfileAccess,
}: ScoreBoardProps) {
  await assignmentsService.getAssignmentsByCohortId(cohortId);

  if (!hasProfileAccess) {
    return <></>;
  }
  return (
    <section className="min-w-72">
      <Separator className="my-4" />
      <H2>Salt Scoring</H2>

      {/* <AverageScore assignments={assignments} />
      <SpiderGraph assignments={assignments} /> */}
    </section>
  );
}
