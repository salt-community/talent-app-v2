import { backgroundsSeed } from "@/features/backgrounds/seed/seed";
import { seedAssignments, seedScores } from "@/features";
import { seedProjects } from "@/features/projects/seed";
import { seedMeili } from "@/lib/meili-search";

(async () => {
  console.log("Start seeding...");

  try {
    await seedScores();
    await backgroundsSeed();
    await seedAssignments();
    await seedProjects();
    await seedMeili();
    console.log("Done seeding");
  } catch (error) {
    console.error("Error during seeding:", error);
  }
})();
