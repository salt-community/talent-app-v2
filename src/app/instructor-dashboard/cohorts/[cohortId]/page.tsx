import { SelectedCohort } from "@/features/instructors-dashboard/components/selected-cohort";
import React from "react";

type Params = {
  params: Promise<{ cohortId: string }>;
};

export default async function Page({ params }: Params) {
  const { cohortId } = await params;

  return (
    <div>
      <SelectedCohort cohortId={cohortId} />
    </div>
  );
}
