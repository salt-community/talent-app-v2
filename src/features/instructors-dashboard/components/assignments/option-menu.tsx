import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components";
import { useToast } from "@/hooks/use-toast";
import { MoreVertical } from "lucide-react";
import { useOptimistic, useTransition } from "react";
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

  const [optimisticStatus, setOptimisticStatus] = useOptimistic(
    status,
    (state, newStatus: boolean | null) =>
      newStatus === null ? state : newStatus
  );

  const [isPending, startTransition] = useTransition();

  async function handleStatusChange() {
    startTransition(() => {
      setOptimisticStatus(!status);
    });

    const result = await updateFixStatusByIdAction(id, !status);

    if (!result.success) {
      setOptimisticStatus(status);

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
  }

  async function handleDeleteFixItem() {
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
  }

  return (
    <div className="flex items-center gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger aria-label="Options Menu" asChild>
          <div className="p-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
            <MoreVertical
              className="text-gray-500 hover:text-primary transition-colors"
              size={18}
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 p-1.5 rounded-lg shadow-lg border border-gray-200">
          <div className="px-3 py-1.5 text-xs font-medium text-gray-500 uppercase">
            Status Options
          </div>
          <DropdownMenuItem>
            <FixItemChangeStatus
              onConfirm={handleStatusChange}
              status={optimisticStatus}
              isPending={isPending}
            />
          </DropdownMenuItem>
          <DropdownMenuSeparator className="my-1 border-gray-200" />
          <DropdownMenuItem>
            <DeleteFixItem
              onConfirm={handleDeleteFixItem}
              isPending={isPending}
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
