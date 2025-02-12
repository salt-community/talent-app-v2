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
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { categoryTags } from "../categories";
import { capitalizeFirstLetter } from "@/lib/utils";
// import { useAssignments } from "../assignments-context";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
};

// type Props = {
//   assignments: Assignment[];
// };

export function SpiderGraph() {
  // const { assignments } = useAssignments();

  const chartData = categoryTags.map((tag) => ({
    category: capitalizeFirstLetter(tag),
  }));

  return (
    <CardContent>
      <ChartContainer config={chartConfig} className="mx-auto max-h-[250px]">
        <RadarChart data={chartData} outerRadius="80%">
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <PolarGrid stroke="#d3d3d3" />
          <PolarAngleAxis
            dataKey="category"
            stroke="#6B6460"
            tick={{ dy: 5, fill: "#6B6460" }}
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
