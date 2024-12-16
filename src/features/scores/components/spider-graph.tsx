"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from "recharts";
import { CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { Assignment } from "../types";
import { calculateAverageCategoryScore } from "../logic";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

type Props = {
  assignments: Assignment[];
};

export function SpiderGraph({ assignments }: Props) {
  const chartData = [
    {
      category: "Frontend",
      score: calculateAverageCategoryScore(assignments, "frontend"),
    },
    {
      category: "Backend",
      score: calculateAverageCategoryScore(assignments, "backend"),
    },
    {
      category: "Conversation",
      score: calculateAverageCategoryScore(assignments, "conversation"),
    },
    {
      category: "Team collaboration",
      score: calculateAverageCategoryScore(assignments, "teamCollaboration"),
    },
    {
      category: "Design",
      score: calculateAverageCategoryScore(assignments, "design"),
    },
    {
      category: "Management",
      score: calculateAverageCategoryScore(assignments, "management"),
    },
  ];

  return (
    <CardContent className="">
      <ChartContainer config={chartConfig} className="mx-auto max-h-[250px]">
        <RadarChart data={chartData} outerRadius="80%">
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <PolarGrid stroke="#d3d3d3" />
          <PolarAngleAxis
            dataKey="category"
            stroke="#808080"
            tick={{
              dy: 5,
              fill: "#808080",
            }}
            tickLine={false}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            axisLine={false}
            tick={false}
          />
          <Radar
            dataKey="score"
            stroke="#6b7280"
            fill="#6b7280"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ChartContainer>
    </CardContent>
  );
}
