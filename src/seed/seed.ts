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
  const devIds = (await developerProfilesService.getAll()).map(
    (developer) => developer.id
  );
  for (const devId of devIds) {
    await seedAssignments(devId);
  }
  await backgroundsSeed(devIds);
  await seedProjects();
  await seedCohorts();
  console.log("Done seeding!");
})();
