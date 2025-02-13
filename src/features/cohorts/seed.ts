import { cohortsService } from "./instance";
import { CohortFormData } from "./types";

export async function seedCohorts() {
  console.log("Seeding cohorts...");

  const cohorts: CohortFormData[] = [
    {
      name: "csfs-sthlm-2025-01-31",
      description: "Fullstack C#",
      status: "ongoing",
    },
    {
      name: "jfs-sthlm-2025-01-31",
      description: "Fullstack Java",
      status: "ongoing",
    },
    {
      name: "jsfs-sthlm-2025-01-31",
      description: "Fullstack JS",
      status: "ongoing",
    },
  ];

  for (const cohort of cohorts) {
    await cohortsService.createCohort(cohort);
  }

  console.log("Seeding cohorts complete!");
}
