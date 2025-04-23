import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components";
import { MoreVertical } from "lucide-react";
import { DeleteFixItem } from "./delete-fix-item";
import { FixItemChangeStatus } from "./fix-status-change";

type Props = {
  id: string;
  status: boolean | null;
  onStatusChange: (id: string, status: boolean) => void;
  onDelete: (id: string) => void;
  isPending: boolean;
};

export function OptionMenu({
  id,
  status,
  onStatusChange,
  onDelete,
  isPending,
}: Props) {
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
              onConfirm={() => onStatusChange(id, status!)}
              status={status}
              isPending={isPending}
            />
          </DropdownMenuItem>
          <DropdownMenuSeparator className="my-1 border-gray-200" />
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <DeleteFixItem
              onConfirm={() => onDelete(id)}
              isPending={isPending}
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
