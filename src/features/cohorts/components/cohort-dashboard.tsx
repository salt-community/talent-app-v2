import { CohortList } from "./cohort-list";
import { AddCohortForm } from "./create-cohort-form";

export function CohortDashboard() {
  return (
    <>
      <h1 className="text-center text-2xl py-6 font-bold">Cohorts</h1>
      <div className="flex justify-center">
        <CohortList />
      </div>
      <div className="flex justify-center">
        <AddCohortForm />
      </div>
    </>
  );
}
