import { backgroundsSeed } from "@/features/backgrounds/seed/seed";
import { seedProjects } from "@/features/projects/seed";
import { seedAssignments, seedIdentities } from "@/features";
import { seedDeveloperProfiles } from "@/features";

(async () => {
  console.log("Start seeding...");
  await Promise.all([
    backgroundsSeed(),
    seedProjects(),
    seedDeveloperProfiles(),
    seedIdentities(),
    seedAssignments(),
  ]);
  console.log("Done seeding...");
})();
