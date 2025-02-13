import { db } from "@/db";
import {
  backgroundsSeed,
  seedAssignments,
  seedCohorts,
  seedDeveloperProfiles,
  seedIdentities,
  seedProjects,
} from "@/features";

(async () => {
  console.log("Starting to seed...");
  const identities = await seedIdentities();

  const cohorts = await seedCohorts(identities);
  await seedAssignments(cohorts);

  const developerProfileIds = await seedDeveloperProfiles(identities);
  await backgroundsSeed(developerProfileIds);

  await seedProjects();

  console.log("Done seeding!");

  await db.$client.end();
})();
