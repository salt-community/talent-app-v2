import { db } from "@/db";
import {
  backgroundsSeed,
  createDeveloperProfilesService,
  seedAssignments,
  seedCohorts,
  seedDeveloperProfiles,
  seedIdentities,
  seedProjects,
} from "@/features";

(async () => {
  const developerProfilesService = createDeveloperProfilesService(db);

  console.log("Starting to seed...");
  await seedIdentities();
  await seedDeveloperProfiles();
  const developerProfileIds = (await developerProfilesService.getAll()).map(
    (developer) => developer.id
  );

  const cohorts = await seedCohorts();

  for (const developerProfileId of developerProfileIds) {
    // await seedAssignments(developerProfileId);
  }
  await backgroundsSeed(developerProfileIds);
  await seedProjects();

  console.log("Done seeding!");

  // TODO: Reactivate when all seeding calls have been fixed to properly await.
  // await db.$client.end();
})();
