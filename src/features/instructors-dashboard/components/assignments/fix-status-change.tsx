type Props = {
  onConfirm: () => void;
  status: boolean | null;
};

export function FixItemChangeStatus({ onConfirm, status }: Props) {
  const newStatus = status === false ? "complete" : "incomplete";

  const textColorClass =
    newStatus === "complete" ? "text-green-600" : "text-red-600";

  return (
    <div
      onClick={onConfirm}
      className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
    >
      <span>
        Set status to:{" "}
        <strong className={`capitalize ${textColorClass}`}>{newStatus}</strong>
      </span>
    </div>
  );
}
