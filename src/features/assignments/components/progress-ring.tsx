type Props = {
  percentage: number;
};
export function ProgressRing({ percentage }: Props) {
  if (Number.isNaN(percentage)) {
    percentage = 0;
  }
  const getStrokeColor = (percentage: number) => {
    if (percentage === 0) return "#808080";
    if (percentage <= 50) return "#4caf50";
    if (percentage <= 69) return "#2196f3";
    if (percentage <= 79) return "#9c27b0";
    if (percentage <= 89) return "#800080";
    if (percentage <= 100) return "#ff7961";
    return "#808080";
  };

  const strokeColor = getStrokeColor(percentage);
  return (
    <div className="relative flex justify-center items-center h-7 w-7 p-4">
      <svg
        className="absolute"
        viewBox="0 0 36 36"
        width="36"
        height="36"
        vectorEffect="non-scaling-stroke"
      >
        <path
          className="circle-bg"
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#e6e6e6"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        <path
          className="circle"
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeDasharray={`${percentage}, 100`}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="absolute text-[0.55rem] font-bold">
        {`${percentage === 0 ? "NA" : percentage.toFixed(0) + "%"}`}
      </div>
    </div>
  );
}
