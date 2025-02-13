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

type Props = {
  cohortId: string;
};
export default async function CohortSelect({ cohortId }: Props) {
  const UnassignedDevelopers = await getAllUnassignedDevelopers();
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a student" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          {UnassignedDevelopers.map((developer, index) => (
            <SelectItem value={developer.id} key={index}>
              {developer.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
