import { instructorService } from "../instance";
import { AddCohortForm } from "./add-cohort";
import { CohortList } from "./Cohorts-list";

export async function InstructorsDashboard() {
  const cohorts = await instructorService.getAllCohorts();

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-center text-3xl py-6 font-bold">Dashboard</h1>
      <div className="flex justify-center mb-8">
        <CohortList cohorts={cohorts} />
      </div>
      <div className="flex justify-center">
        <AddCohortForm />
      </div>
    </div>
  );
}
