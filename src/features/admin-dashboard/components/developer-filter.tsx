"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/";
import FilterCheckbox from "./filter-checkbox";
import { ListFilter } from "lucide-react";

type FilterStatus = {
  highlighted: boolean;
  published: boolean;
  unpublished: boolean;
};
type Props = {
  filterStatus: {
    highlighted: boolean;
    published: boolean;
    unpublished: boolean;
  };
  setFilterStatus: React.Dispatch<React.SetStateAction<FilterStatus>>;
};

export default function DevelopersFilter({
  filterStatus,
  setFilterStatus,
}: Props) {
  return (
    <div className="flex items-center gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex">
            <ListFilter />
            <p className="pl-2 text-gray-500 text-sm pt-1">Filter</p>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 ">
          <FilterCheckbox
            value="highlighted"
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
          <FilterCheckbox
            value="published"
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
          <FilterCheckbox
            value="unpublished"
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
