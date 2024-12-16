import { backgroundsSeed } from "@/features/backgrounds/seed/seed";
import { seedProjects } from "@/features/projects/seed";
import { seedAssignments, seedIdentities } from "@/features";
import { seedDeveloperProfiles } from "@/features";
import { seedMeili } from "@/lib/meili-search";
import { developerService } from "@/features/developer-profiles/instance";

(async () => {
  console.log("Start seeding...");

  await seedIdentities();
  await seedDeveloperProfiles();
  const devIds = (await developerService.getAllDeveloperProfiles()).map(
    (developer) => developer.id
  );
  await seedAssignments(devIds);
  await backgroundsSeed(devIds);

  await seedProjects();
  await seedMeili();

  console.log("Done seeding...");
})();
