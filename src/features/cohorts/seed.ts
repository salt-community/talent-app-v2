import { insecureCohortService } from "./instance";
import { CohortFormData } from "./types";

export async function seedCohorts(identityIds: string[]) {
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

  const cohortIds: string[] = [];

  for (const cohort of cohorts) {
    const cohortId = (await insecureCohortService.createCohort(cohort)).id;
    cohortIds.push(cohortId);
  }

  const modulusLimit = cohorts.length - 1;

  for (let i = 0; i < cohortIds.length; i++) {
    const cohortId = cohortIds[i];

    for (let j = 0; j < identityIds.length; j++) {
      const identityId = identityIds[j];

      if (j % modulusLimit === i) {
        await insecureCohortService.addDeveloperToCohort({
          cohortId,
          identityId,
        });
      }
    }
  }

  console.log("Seeding cohorts complete!");

  return cohortIds;
}
