"use server";
import { db } from "@/db";
import { IdentitySelect } from "../iam";
import { CohortFormData } from "./types";
import { createCohortsService } from "./service";
import { cohortsSeedingService } from "./instance";

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
    const cohortId = (await cohortsSeedingService.addCohort(cohort)).id;
    cohortIds.push(cohortId);
  }

  const modulusLimit = cohorts.length - 1;

  for (let i = 0; i < cohortIds.length; i++) {
    const cohortId = cohortIds[i];

    for (let j = 0; j < identities.length; j++) {
      const identity = identities[j];

      if (j % modulusLimit === i) {
        await cohortsSeedingService.addDeveloperToCohort({
          cohortId,
          identityId: identity.id,
        });
      }
    }
  }

  console.log("Done seeding cohorts!");

  return cohortIds;
}
