import { getAllUnassignedDevelopers } from "../actions";
import CohortSelect from "./cohort-select";

type Props = {
  cohortId: string;
};
export default async function CohortFormWrapper({ cohortId }: Props) {
  const UnassignedDevelopers = await getAllUnassignedDevelopers();
  return (
    <div>
      <p className="font-semibold ml-1 mt-2">Add developers</p>
      <CohortSelect
        cohortId={cohortId}
        UnassignedDevelopers={UnassignedDevelopers}
      />
    </div>
  );
}
