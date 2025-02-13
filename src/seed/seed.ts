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
  await seedIdentities();
  const developerProfileIds = await seedDeveloperProfiles();
  const cohorts = await seedCohorts();
  await seedAssignments(cohorts);
  await backgroundsSeed(developerProfileIds);
  await seedProjects();

  console.log("Done seeding!");

  // TODO: Reactivate when all seeding calls have been fixed to properly await.
  // await db.$client.end();
})();
