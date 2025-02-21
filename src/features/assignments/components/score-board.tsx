import { Separator, H2 } from "@/components/ui";
import { assignmentsService } from "../instance";

type ScoreBoardProps = {
  identityId: string;
  hasProfileAccess: boolean;
};

export async function ScoreBoard({
  identityId,
  hasProfileAccess,
}: ScoreBoardProps) {
  return (
    <section className="min-w-72">
      <Separator className="my-4" />
      <H2>Salt Scoring</H2>

      {/* <AverageScore assignments={assignments} />
      <SpiderGraph assignments={assignments} /> */}
    </section>
  );
}
