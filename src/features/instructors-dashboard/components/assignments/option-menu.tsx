import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components";
import { useToast } from "@/hooks/use-toast";
import { MoreVertical } from "lucide-react";
import { useCallback } from "react";
import {
  deleteFixItemByIdAction,
  updateFixStatusByIdAction,
} from "../../action";
import { DeleteFixItem } from "./delete-fix-item";
import { FixItemChangeStatus } from "./fix-status-change";

type Props = {
  id: string;
  status: boolean | null;
};

export function OptionMenu({ id, status }: Props) {
  const { toast } = useToast();
  const handleStatusChange = useCallback(async () => {
    const result = await updateFixStatusByIdAction(id, !status);
    if (!result.success) {
      return toast({
        title: "Error",
        description: String(result.error),
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: `Fix item status changed to ${!status ? "completed" : "pending"}`,
        variant: "default",
      });
    }
  }, [id, status]);

  const handleDeleteFixItem = useCallback(async () => {
    const result = await deleteFixItemByIdAction(id);
    if (!result.success) {
      return toast({
        title: "Error",
        description: String(result.error),
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Fix item deleted successfully",
        variant: "default",
      });
    }
  }, [id]);

  return (
    <div className="flex items-center gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger aria-label="Options Menu">
          <button className="p-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
            <MoreVertical
              className="text-gray-500 hover:text-primary transition-colors"
              size={18}
            />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 p-1.5 rounded-lg shadow-lg border border-gray-200">
          <div className="px-3 py-1.5 text-xs font-medium text-gray-500 uppercase">
            Status Options
          </div>

          <DropdownMenuRadioGroup className="space-y-1">
            <FixItemChangeStatus
              onConfirm={handleStatusChange}
              status={status}
            />
          </DropdownMenuRadioGroup>

          <DropdownMenuSeparator className="my-1 border-gray-200" />

          <DeleteFixItem onConfirm={handleDeleteFixItem} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
