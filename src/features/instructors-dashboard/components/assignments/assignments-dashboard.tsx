import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Separator } from "@/components";
import { Trash2 } from "lucide-react";
import { instructorService } from "../../instance";
import AddAssignmentButton from "./add-assignment-button";

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

  const tabs = [
    { name: "Assignments", count: assignments.length, icon: "⭐" },
    { name: "Students", count: 0, icon: "👥" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-20">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">{name.toUpperCase()}</h1>
        <div className="flex border-b">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={`px-4 py-2 flex items-center gap-2 ${
                tab.name === "Assignments" ? "border-b-2 border-red-500" : ""
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
              {typeof tab.count === "number" && (
                <span className="ml-1 text-gray-600">{tab.count}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center -mb-2">
          <h2 className="text-2xl font-semibold ">Assignments</h2>
          <AddAssignmentButton cohorts={cohort} />
        </div>

        <Separator />

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
                <div className="flex items-center gap-2">
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Active
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="px-4 py-1 bg-gray-50 rounded-md border border-gray-300 mr-2"
                  aria-label="Copy invite link"
                >
                  Copy invite link
                </button>

                <button className="text-red-500" aria-label="Delete">
                  <Trash2></Trash2>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
