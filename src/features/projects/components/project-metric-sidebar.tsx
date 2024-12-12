import { Separator } from "@/components";
import ProjectMetric from "./project-metric";

type Props = {
  commits: string;
  performance: string;
  issues: string;
};

export default function MetricSidebar({ commits, performance, issues }: Props) {
  return (
    <div className="flex flex-col items-center justify-between gap-4 mt-2 mr-2">
      <ProjectMetric name="Commits" metric={commits} />
      <Separator orientation="horizontal" />
      <ProjectMetric name="Issues" metric={issues} />
      <Separator orientation="horizontal" />
      <ProjectMetric name="Performance" metric={performance} />
    </div>
  );
}
