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
  const identityIds = await seedIdentities();

  const cohorts = await seedCohorts(identityIds);
  await seedAssignments(cohorts);

  const developerProfileIds = await seedDeveloperProfiles();
  await backgroundsSeed(developerProfileIds);

  await seedProjects();

  console.log("Done seeding!");

  // TODO: Reactivate when all seeding calls have been fixed to properly await.
  // await db.$client.end();
})();
