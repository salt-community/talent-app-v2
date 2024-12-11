import { backgroundsSeed } from "@/features/backgrounds/seed/seed";
import { seedProjects } from "@/features/projects/seed";
import { seedMeili } from "@/lib/meili-search";
import { seedIdentities } from "@/features";
import { seedDeveloperProfiles } from "@/features";

(async () => {
  console.log("Start seeding...");
  await Promise.all([
    seedDeveloperProfiles(),
    seedIdentities(),
    backgroundsSeed(),
  ]);
  await seedProjects();
  await seedMeili();
  console.log("Done seeding...");
})();
