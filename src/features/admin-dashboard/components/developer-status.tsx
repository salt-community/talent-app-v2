import { Circle } from "lucide-react";

type Props = {
  status: string;
};

export function DeveloperStatus({ status }: Props) {
  let color;
  let fillColor

  if (status === "published") {
    color = "#60a5fa";
    fillColor = "#bfdbfe";
  } else if (status === "unpublished") {
    color = "#a1a1aa";
    fillColor = "#e4e4e7";
  } else if (status === "highlighted") {
    color = "#c084fc";
    fillColor = "#e9d5ff";
  }

  return <Circle size={14} color={color} fill={fillColor} strokeWidth={4} />;
}