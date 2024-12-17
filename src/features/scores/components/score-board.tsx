import { Separator } from "@/components/ui/separator";
import { AverageScore } from "./average-score";
import { SpiderGraph } from "./spider-graph";
import { H2 } from "@/components/ui/header/header-h2";
import { scoresService } from "../instance";
import { AddAssignment } from "./add-assignment";
import { Assignments } from "./accordion/assignments";

type Props = { devId: string };

export async function ScoreBoard({ devId }: Props) {
  const assignments = await scoresService.getAssignmentsByDevId(devId);

  return (
    <section className="min-w-72">
      <Separator className="my-4" />
      <H2>Salt Scoring</H2>
      <AverageScore assignments={assignments} />
      <SpiderGraph assignments={assignments} />
      <AddAssignment devId={devId} />
      <Assignments assignments={assignments} />
    </section>
  );
}
