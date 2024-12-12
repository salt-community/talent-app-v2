import React from "react";

type Props = {
  name: string;
  metric: string;
};

export default function ProjectMetric({ name, metric }: Props) {
  return (
    <article className="flex flex-col items-center my-2">
      <p className="text-gray-400 text-sm">{name}</p>
      <p className="font-semibold">{metric}</p>
    </article>
  );
}
