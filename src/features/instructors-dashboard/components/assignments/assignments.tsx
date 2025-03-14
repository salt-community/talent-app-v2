import React from "react";
import { notFound } from "next/navigation";
import { instructorService } from "../../instance";
import AddAssignmentButton from "./add-assignment-button";
import { Separator } from "@/components";
import { AssignmentListItem } from "./assignment-list-item";

type Props = {
  name: string;
};

export async function AssignmentsDashboard({ name }: Props) {
  const cohort = await instructorService.getAllCohorts();
  const foundCohort = cohort.find((cohort) => cohort.name === name);
  if (!foundCohort) notFound();

  const cohortId = foundCohort.id;
  const assignments =
    await instructorService.getAssignmentsByCohortId(cohortId);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center py-2">
        <h2 className="text-2xl font-semibold">Assignments</h2>
        <AddAssignmentButton cohortId={cohortId} />
      </div>
      <Separator className="mb-4" />
      <div className="space-y-4">
        {assignments.map((assignment) => (
          <AssignmentListItem
            assignment={assignment}
            foundCohort={foundCohort}
            cohortId={cohortId}
            key={assignment.id}
          />
        ))}
      </div>
    </div>
  );
}
