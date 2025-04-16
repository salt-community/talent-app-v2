import { AlertDialogDemo } from "@/components/alert-dialog/alertDialog";
import { Trash2 } from "lucide-react";

type Props = {
  onConfirm: () => void;
};

export function DeleteFixItem({ onConfirm }: Props) {
  return (
    <AlertDialogDemo
      title="Are you sure?"
      description="This action can't be undone, are you sure?"
      onConfirm={onConfirm}
    >
      <div className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer">
        <Trash2 size={16} className="text-red-500" />
        <span>Delete this fix</span>
      </div>
    </AlertDialogDemo>
  );
}
