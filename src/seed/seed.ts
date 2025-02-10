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
  for (const developerProfileId of developerProfileIds) {
    await seedAssignments(developerProfileId);
  }
  await backgroundsSeed(developerProfileIds);
  await seedProjects();
  await seedCohorts();
  console.log("Done seeding!");
})();
