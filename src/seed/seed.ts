import { db } from "@/db";
import {
  backgroundsSeed,
  createDeveloperProfilesService,
  seedAssignments,
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
  await seedAssignments(devIds);
  await backgroundsSeed(devIds);
  await seedProjects();
  console.log("Done seeding!");
})();
