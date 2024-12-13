import { backgroundsSeed } from "@/features/backgrounds/seed/seed";
import { seedScores } from "@/features/scores/seed";
import { seedProjects } from "@/features/projects/seed";
import { seedIdentities } from "@/features";
import { seedDeveloperProfiles } from "@/features";

(async () => {
  console.log("Start seeding...");
  await Promise.all([
    seedScores(),
    backgroundsSeed(),
    seedProjects(),
    seedDeveloperProfiles(),
    seedIdentities(),
  ]);
  console.log("Done seeding...");
})();
