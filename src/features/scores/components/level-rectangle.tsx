import { ProgressRing } from "./progress-ring";

type Props = {
  percentage: number;
};

export function LevelRectangle({ percentage }: Props) {
  const getStrokeColor = (percentage: number) => {
    if (percentage === 0) return "#808080";
    if (percentage <= 50) return "#4caf50";
    if (percentage <= 69) return "#2196f3";
    if (percentage <= 79) return "#9c27b0";
    if (percentage <= 89) return "#800080";
    return "#ff7961";
  };

  const getLevel = (percentage: number) => {
    if (percentage === 0) return 0;
    if (percentage <= 50) return 1;
    if (percentage <= 69) return 2;
    if (percentage <= 79) return 3;
    if (percentage <= 89) return 4;
    return 5;
  };

  const borderColor = getStrokeColor(percentage);
  const level = getLevel(percentage);

  return (
    <div className="flex justify-start items-start mt-3 mb-4">
      <div
        className="flex border-2 rounded-full w-30 p-1 items-center"
        style={{ borderColor }}
      >
        <ProgressRing percentage={percentage} />
        <div className="font-semibold px-6">{`Level ${level}`}</div>
      </div>
    </div>
  );
}
