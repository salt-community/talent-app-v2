import { backgroundsSeed } from "@/features/backgrounds/seed/seed";
import { seedProjects } from "@/features/projects/seed";
import { seedAssignments, seedIdentities } from "@/features";
import { seedDeveloperProfiles } from "@/features";
import { developerService } from "@/features/developer-profiles/instance";

(async () => {
  console.log("Start seeding...");
  await seedIdentities();
  await seedDeveloperProfiles();
  const devIds = (await developerService.getAll()).map(
    (developer) => developer.id,
  );
  await seedAssignments(devIds);
  await backgroundsSeed(devIds);
  await seedProjects();
  console.log("Done seeding...");
})();
