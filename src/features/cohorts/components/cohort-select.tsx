"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addDeveloperToCohort } from "../actions";
import { UnassignedDevelopers } from "../types";
import { useState } from "react";
import { Button } from "@/components";
import { Plus } from "lucide-react";

type Props = {
  cohortId: string;
  UnassignedDevelopers: UnassignedDevelopers[];
};
export default function CohortSelect({
  cohortId,
  UnassignedDevelopers,
}: Props) {
  const [selectedDeveloper, setSelectedDeveloper] = useState("");

  async function handleSubmit() {
    await addDeveloperToCohort(cohortId, selectedDeveloper);
    setSelectedDeveloper("");
  }
  return (
    <form action={handleSubmit} className="mt-1">
      <Select value={selectedDeveloper} onValueChange={setSelectedDeveloper}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a student" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Developers</SelectLabel>
            {UnassignedDevelopers.map((developer, index) => (
              <SelectItem value={developer.id} key={index}>
                {developer.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <input type="hidden" name="cohortId" value={selectedDeveloper} />
      {selectedDeveloper !== "" && (
        <Button
          type="submit"
          variant="outline"
          className="cursor-pointer flex gap-1 justify-center items-center mt-2 mb-4"
        >
          <Plus className="text-primary font-semibold" size={18} />
          <p className="font-semibold">Add developer</p>
        </Button>
      )}
    </form>
  );
}
