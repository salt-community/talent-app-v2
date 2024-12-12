import { backgroundsSeed } from "@/features/backgrounds/seed/seed";
import { seedScores } from "@/features/scores/seed";
import { seedProjects } from "@/features/projects/seed";
import { seedIdentities } from "@/features/identity-access-management/seed";
import { seedDeveloperProfiles } from "@/features/developer/seed";

(async () => {
  console.log("Start seeding...");
  await Promise.all([
    seedScores(),
    backgroundsSeed(),
    seedProjects(),
    seedIdentities(),
    seedDeveloperProfiles(),
  ]);
  console.log("Done seeding...");
})();
