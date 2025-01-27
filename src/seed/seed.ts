import {
  seedIdentities,
  backgroundsSeed,
  seedAssignments,
  developerProfilesService,
  seedDeveloperProfiles,
  seedProjects,
} from "@/features";

(async () => {
  console.log("Start seeding...");
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
  console.log("Done seeding...");
})();
