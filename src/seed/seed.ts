import { backgroundsSeed } from "@/features/background/seed/seed";
import { seedDeveloperScores } from "@/features/scores/seed";

(async () => {
  console.log("Start seeding...");
  await Promise.all([seedDeveloperScores() /* seed() */]);
  await backgroundsSeed();
  console.log("Done seeding...");
})();
