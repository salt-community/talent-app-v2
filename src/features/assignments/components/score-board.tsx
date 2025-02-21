import { Separator, H2 } from "@/components/ui";
import { AverageScore } from "./average-score";
import { assignmentsService } from "@/features";

type ScoreBoardProps = {
  identityId: string;
};

export async function ScoreBoard({ identityId }: ScoreBoardProps) {
  const getCohortIdentity =
    await assignmentsService.getCohortIdentity(identityId);

  // const assignments = await assignmentsService.getAssignmentsByCohortId(
  //   getCohortIdentity.cohortId
  // );
  return (
    <section className="min-w-72">
      <Separator className="my-4" />
      <H2>Salt Scoring</H2>

      <AverageScore identityId={identityId} />
      {/* <SpiderGraph assignments={assignments} /> */}
    </section>
  );
}
