import React from "react";
import StudentCard from "./developer-card";
import { Developer } from "../../types";
import AddDeveloperButton from "./add-developer-button";
import { instructorService } from "../../instance";
import { notFound } from "next/navigation";

type Props = {
  name: string;
};

export async function DeveloperDashboard({ name }: Props) {
  const cohorts = await instructorService.getAllCohorts();
  const foundCohort = cohorts.find((cohort) => cohort.name === name);
  if (!foundCohort) notFound();
  const cohortId = foundCohort.id;
  const developers =
    await instructorService.getCohortStudentsByCohortId(cohortId);
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center py-2">
        <h2 className="text-2xl font-semibold">Developers</h2>
        <div className="bg-green-600 text-white px-4 py-1 rounded-md flex items-center gap-2">
          <AddDeveloperButton />
        </div>
      </div>
      <StudentCard developer={developers} />
    </div>
  );
}
