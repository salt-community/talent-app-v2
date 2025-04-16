import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components";
import { MoreVertical } from "lucide-react";
import { DeleteFixItem } from "./delete-fix-item";
import { FixItemChangeStatus } from "./fix-status-change";

type Props = {
  id: string;
  status: boolean | null;
};

export default function OptionMenu({ id, status }: Props) {
  const handleStatusChange = () => {
    console.log("status changed");
  };
  const handleDeleteFixItem = () => {
    console.log("delete fix item");
  };
  return (
    <div className="flex items-center gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger>
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
