import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { instructorService } from "../../instance";
import AddAssignmentButton from "./add-assignment-button";
import { Separator } from "@/components";
import { CopyAssignmentButton } from "./copy-assignment-button";
import { DeleteAssignmentButton } from "./delete-assignment-button";

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
        <AddAssignmentButton cohorts={cohort} />
      </div>
      <Separator className="mb-4" />
      <div className="space-y-4">
        {assignments.map((assignment) => {
          return (
            <div
              key={assignment.id}
              className="flex justify-between items-center border-b pb-4"
            >
              <div className="flex items-center gap-4">
                <Link
                  href={`/instructor-dashboard/cohorts/${foundCohort.name}/assignments/${assignment.title}`}
                  className="text-header font-medium hover:underline hover:underline-offset-4"
                >
                  {assignment.title}
                </Link>
              </div>

              <div className="flex items-center gap-2">
                <CopyAssignmentButton
                  link={`/instructor-dashboard/cohorts/${foundCohort.name}/assignments/${assignment.title}`}
                />
                <DeleteAssignmentButton
                  assignmentId={assignment.id}
                  name={assignment.title}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
