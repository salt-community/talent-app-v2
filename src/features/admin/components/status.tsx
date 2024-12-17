import { Circle } from "lucide-react";

type Props = {
  status: string;
};

export function Status({ status }: Props) {
  let fillColor;

  if (status === "published") {
    fillColor = "green";
  } else if (status === "unpublished") {
    fillColor = "red";
  } else if (status === "highlighted") {
    fillColor = "yellow";
  }

  return <Circle size={14} fill={fillColor} color="none" />;
}