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
import CohortSelect from "./cohort-select";

type Props = {
  cohortId: string;
};
export default async function CohortFormWrapper({ cohortId }: Props) {
  const UnassignedDevelopers = await getAllUnassignedDevelopers();
  return (
    <>
      <CohortSelect
        cohortId={cohortId}
        UnassignedDevelopers={UnassignedDevelopers}
      />
    </>
  );
}
