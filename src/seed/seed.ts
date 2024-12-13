import { backgroundsSeed } from "@/features/backgrounds/seed/seed";
import { seedProjects } from "@/features/projects/seed";
import { seedIdentities } from "@/features";
import { seedDeveloperProfiles } from "@/features";
import { seedMeili } from "@/lib/meili-search";
import { developerService } from "@/features/developer-profiles/instance";

(async () => {
  console.log("Start seeding...");

  await seedIdentities();
  await seedDeveloperProfiles();
  const ids = (await developerService.getAllDeveloperProfiles()).map(
    (dev) => dev.id,
  );

  await backgroundsSeed(ids);
  await seedProjects();
  await seedMeili();
  console.log("Done seeding...");
})();
