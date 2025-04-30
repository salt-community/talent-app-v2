import dynamic from "next/dynamic";
import { instructorService } from "../instance";
import { CohortCard } from "./cohorts/cohort-card";

const AddCohortForm = dynamic(() =>
  import("./cohorts/add-cohort").then((mod) => mod.AddCohortForm)
);

export async function InstructorsDashboard() {
  const cohorts = await instructorService.getAllCohorts();

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-3xl py-6 font-bold">
        Instructor Dashboard
      </h1>
      <div className="flex justify-center mb-8">
        <CohortCard cohorts={cohorts} />
      </div>
      <div className="flex justify-center">
        <AddCohortForm />
      </div>
    </div>
  );
}
