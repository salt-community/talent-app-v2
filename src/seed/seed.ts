import {
  seedIdentities,
  backgroundsSeed,
  seedAssignments,
  developerService,
  seedDeveloperProfiles,
  seedProjects,
} from "@/features";

(async () => {
  console.log("Start seeding...");
  await seedIdentities();
  await seedDeveloperProfiles();
  const devIds = (await developerService.getAll()).map(
    (developer) => developer.id
  );
  await seedAssignments(devIds);
  await backgroundsSeed(devIds);
  await seedProjects();
  console.log("Done seeding...");
})();
