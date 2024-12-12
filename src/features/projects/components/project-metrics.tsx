import { Separator } from "@/components";

type Props = {
  commits: string;
  performance: string;
  issues: string;
};

export default function ProjectMetrics({
  commits,
  performance,
  issues,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-between gap-4 mt-2 mr-2">
      <article className="flex flex-col items-center my-2">
        <p className="text-gray-400 text-sm">Commits</p>
        <p className="font-semibold">{commits}</p>
      </article>
      <Separator orientation="horizontal" />
      <article className="flex flex-col items-center my-2">
        <p className="text-gray-400 text-sm">Issues</p>
        <p className="font-semibold">{issues}</p>
      </article>
      <Separator orientation="horizontal" />
      <article className="flex flex-col items-center my-2">
        <p className="text-gray-400 text-sm">Performance</p>
        <p className="font-semibold">{performance}</p>
      </article>
    </div>
  );
}
