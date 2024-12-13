import { backgroundsSeed } from "@/features/backgrounds/seed/seed";
import { seedProjects } from "@/features/projects/seed";
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
  console.log("Done seeding...");
})();
