import { instructorService } from "../instance";
import { AddCohortForm } from "./add-cohort";
import { CohortCard } from "./cohort-card";

export async function InstructorsDashboard() {
  const cohorts = await instructorService.getAllCohorts();

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-center text-3xl py-6 font-bold">Dashboard</h1>
      <div className="flex justify-center mb-8">
        <CohortCard cohorts={cohorts} />
      </div>
      <div className="flex justify-center">
        <AddCohortForm />
      </div>
    </div>
  );
}
