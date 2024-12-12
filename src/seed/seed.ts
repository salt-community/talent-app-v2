import { backgroundsSeed } from "@/features/backgrounds/seed/seed";
import { seedAssignments, seedScores } from "@/features";
import { seedProjects } from "@/features/projects/seed";

(async () => {
  console.log("Start seeding...");

  try {
      await seedScores();
      await backgroundsSeed();
      await seedAssignments();
      await seedProjects();
      console.log("Done seeding");
  } catch (error) {
      console.error("Error during seeding:", error);
  }
})();
