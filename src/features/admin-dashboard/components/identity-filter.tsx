"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/";
import FilterCheckbox from "./filter-checkbox";
import { ListFilter } from "lucide-react";
import { FilterStatusRole } from "../types";

type Props = {
  filterStatus: FilterStatusRole;
  setFilterStatus: React.Dispatch<React.SetStateAction<FilterStatusRole>>;
};

export default function IdentityFilter({
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
        <DropdownMenuContent className="w-40 ">
          <FilterCheckbox
            value="developer"
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
          <FilterCheckbox
            value="core"
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
          <FilterCheckbox
            value="admin"
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
