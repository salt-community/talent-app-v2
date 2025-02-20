import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TrashIcon, Copy } from "lucide-react";
import { instructorService } from "../instance";
import AddAssignmentButton from "./assignments/add-assignment-button";
import { Separator } from "@/components";

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
        <div className="bg-green-600 text-white px-4 py-1 rounded-md flex items-center gap-2">
          <AddAssignmentButton cohorts={cohort} />
        </div>
      </div>
      <Separator className="mb-4" />
      <div className="space-y-4">
        {assignments.map((assignment) => (
          <div
            key={assignment.id}
            className="flex justify-between items-center border-b pb-4"
          >
            <div className="flex items-center gap-4">
              <Link
                href={`/instructor-dashboard/cohorts/${foundCohort.name}/assignments/${assignment.title}`}
                className="text-blue-700 font-medium hover:underline hover:underline-offset-4"
              >
                {assignment.title}
              </Link>
            </div>

            <div className="flex items-center gap-2">
              {/* must convert to their own component later on when functionality is added  */}
              <button
                className="px-3 py-1.5 bg-gray-50 border border-gray-300 mr-2 flex items-center gap-2 text-sm hover:bg-gray-100 p-1.5 rounded-md transition-colors"
                aria-label="Copy invite link"
              >
                <Copy size={16} />
                Copy invite link
              </button>

              <button
                className="text-red-500 hover:bg-gray-100 p-1.5 rounded-md transition-colors"
                aria-label="Delete"
              >
                <TrashIcon size={18} />
              </button>
              {/* all the way here */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
