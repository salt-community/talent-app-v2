type Props = {
  onConfirm: () => void;
  status: string;
};

export function FixItemChangeStatus({ onConfirm, status }: Props) {
  return (
    <div
      onClick={onConfirm}
      className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
    >
      <span className="capitalize">
        Set status to: <strong>{status}</strong>
      </span>
    </div>
  );
}
