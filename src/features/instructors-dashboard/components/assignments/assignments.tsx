import { Separator } from "@/components";
import { instructorService } from "../../instance";
import { AssignmentListItem } from "./assignment-list-item";
import dynamic from "next/dynamic";

type Props = {
  name: string;
};

const AddAssignmentButton = dynamic(
  () => import("./add-assignment-button").then((mod) => mod.default),
  {
    loading: () => <div className="p-4">Loading form...</div>,
  }
);

export async function AssignmentsDashboard({ name }: Props) {
  const cohort = await instructorService.getAllCohorts();
  const foundCohort = cohort.find((cohort) => cohort.name === name);
  if (!foundCohort) {
    return <div className="text-center">Cohort not found</div>;
  }

  const cohortId = foundCohort.id;
  const assignments =
    await instructorService.getAssignmentsByCohortId(cohortId);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="md:flex justify-between items-center py-2">
        <h2 className="text-2xl font-semibold">Assignments</h2>
        <AddAssignmentButton cohortId={cohortId} />
      </div>
      <Separator className="mb-4" />
      <div className="space-y-4">
        {assignments.map((assignment) => (
          <AssignmentListItem
            assignment={{
              ...assignment,
              comment: null,
              categories: [],
            }}
            foundCohort={foundCohort}
            cohortId={cohortId}
            key={assignment.id}
          />
        ))}
      </div>
    </div>
  );
}
