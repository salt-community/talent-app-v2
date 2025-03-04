import { db } from "@/db";
import { seedAssignments } from "@/features/assignments";
import { seedCohorts } from "@/features/cohorts";
import { seedTempDeveloperProfiles } from "@/features/developer-profiles";
import { seedIdentities } from "@/features/iam";
import { seedProjects } from "@/features/projects";

(async () => {
  console.log("Starting to seed...");
  const identities = await seedIdentities();

  const cohorts = await seedCohorts(identities);
  await seedAssignments(cohorts);

  const developerProfileIds = await seedTempDeveloperProfiles(identities);
  await seedProjects(developerProfileIds);
  console.log("Done seeding!");

  await db.$client.end();
})();
