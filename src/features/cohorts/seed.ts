import { IdentitySelect } from "../iam";
import { insecureCohortService } from "./instance";
import { CohortFormData } from "./types";

export async function seedCohorts(identities: IdentitySelect[]) {
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

    for (let j = 0; j < identities.length; j++) {
      const identity = identities[j];

      if (j % modulusLimit === i) {
        await insecureCohortService.addDeveloperToCohort({
          cohortId,
          identityId: identity.id,
        });
      }
    }
  }

  console.log("Seeding cohorts complete!");

  return cohortIds;
}
