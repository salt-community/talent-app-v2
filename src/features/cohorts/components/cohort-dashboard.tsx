import { fetchCohortsAction } from "../actions";
import { CohortList } from "./cohort-list";
import { AddCohortForm } from "./create-cohort-form";

export async function CohortDashboard() {
  const cohorts = await fetchCohortsAction();

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-center text-3xl py-6 font-bold">Cohorts</h1>
      <div className="flex justify-center mb-8">
        <CohortList cohorts={cohorts} />
      </div>
      <div className="flex justify-center">
        <AddCohortForm />
      </div>
    </div>
  );
}
