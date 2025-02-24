import React from "react";
import StudentCard from "./developer-card";
import AddDeveloperButton from "./open-developer-form-button";
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

  const validDevelopers = developers.filter(
    (developer) => developer !== undefined
  );
  const developerProfiles = await instructorService.getAllDevelopers();
  const validDeveloperProfiles = developerProfiles.filter(
    (developerProfile) => developerProfiles !== undefined
  );
  const unassignedDevelopers = validDeveloperProfiles.filter(
    (dev: { id: string }) =>
      !developers.find((developer) => developer.id === dev.id)
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center py-2">
        <h2 className="text-2xl font-semibold">Developers</h2>
        <AddDeveloperButton
          developer={unassignedDevelopers}
          cohortId={foundCohort.id}
        />
      </div>
      <StudentCard developer={validDevelopers} />
    </div>
  );
}
