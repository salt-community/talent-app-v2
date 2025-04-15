import React from "react";
import Link from "next/link";
import { CopyAssignmentButton } from "./copy-assignment-url-button";
import { DeleteAssignmentButton } from "./delete-assignment-button";
import EditAssignmentButton from "./edit-assignment-button";
import { Assignment, Cohort } from "../../types";

type Props = {
  assignment: Assignment;
  foundCohort: Cohort;
  cohortId: string;
};

export async function AssignmentListItem({ assignment, foundCohort }: Props) {
  return (
    <div className="flex justify-between items-center border-b pb-4">
      <div className="flex items-center gap-4">
        <Link
          href={`/instructor-dashboard/cohorts/${foundCohort.name}/assignments/${assignment.slug}`}
          className="text-header font-medium text-sm md:text-base p-2 md:p-0 hover:underline hover:underline-offset-4"
        >
          {assignment.title}
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <CopyAssignmentButton
          link={`/instructor-dashboard/cohorts/${foundCohort.name}/assignments/${assignment.slug}`}
        />
        <EditAssignmentButton />
        <DeleteAssignmentButton
          assignmentId={assignment.id}
          name={assignment.title}
        />
      </div>
    </div>
  );
}
