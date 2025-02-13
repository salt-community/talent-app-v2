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
import { getAllUnassignedDevelopers } from "../actions";
import { UnassignedDevelopers } from "../types";
import { useState } from "react";

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
  }
  return (
    <form action={handleSubmit}>
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
      <button type="submit">Add</button>
    </form>
  );
}
