import { db } from "@/db";
import { seedAssignments } from "@/features/assignments";
import { seedCohorts } from "@/features/cohorts";
import { seedIdentities } from "@/features/iam";

(async () => {
  console.log("Starting to seed...");
  const identities = await seedIdentities();
  const cohorts = await seedCohorts(identities);
  await seedAssignments(cohorts);
  console.log("Done seeding!");

  await db.$client.end();
})();
