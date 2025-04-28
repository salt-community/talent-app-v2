import { AlertDialogDemo } from "@/components/alert-dialog/alertDialog";
import { Trash2 } from "lucide-react";
import { useCallback } from "react";

type Props = {
  onConfirm: () => void;
  isPending: boolean;
  closeDropdown?: () => void;
};

export function DeleteFixItem({ onConfirm, isPending, closeDropdown }: Props) {
  const handleConfirm = useCallback(() => {
    onConfirm();
  }, [onConfirm]);

  return (
    <AlertDialogDemo
      title="Are you sure?"
      description="This action can't be undone, are you sure?"
      onConfirm={handleConfirm}
      onOpenChange={(open) => {
        if (!open && closeDropdown) {
          setTimeout(closeDropdown, 0);
        }
      }}
    >
      <button
        type="button"
        className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
        disabled={isPending}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Trash2 size={16} className="text-red-500" />
        <span>Delete this fix</span>
      </button>
    </AlertDialogDemo>
  );
}