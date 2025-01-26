import { db } from "@/db";
import { cohorts } from "./schema";

async function seed() {
  await db.insert(cohorts).values([
    { name: "FS-2025", description: "FullStack C# Cohort" },
    { name: "BE-2025", description: "Backend Java Cohort" },
    { name: "FS-2026", description: "FullStack C# Cohort" },
    { name: "BE-2026", description: "Backend Java Cohort" },
  ]);
  console.log("Seeding complete!");
}

seed().catch((err) => {
  console.error("Seeding error:", err);
});
