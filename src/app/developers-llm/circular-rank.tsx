type Props = {
  percentage: number;
};

export default function CircularRank({ percentage }: Props) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - percentage / 100);

  return (
    <div className="relative w-10 h-10">
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs text-paragraphLight">{percentage}%</span>
      </div>
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="stroke-slate-100"
          cx="50"
          cy="50"
          r={radius}
          strokeWidth="10"
          transform="rotate(-90 50 50)"
          fill="none"
        />
        <circle
          className="text-lightGray stroke-current"
          cx="50"
          cy="50"
          r={radius}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 50 50)"
          fill="none"
        />
      </svg>
    </div>
  );
}
