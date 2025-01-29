import { db } from "@/db";
import { cohorts } from "@/features/cohorts/schema";
import { identities } from "@/features/iam/schema";
import { faker } from "@faker-js/faker";

async function seed() {
  console.log("Seeding cohorts...");
  await db.insert(cohorts).values([
    { name: "FS-2025", description: "FullStack C# Cohort" },
    { name: "BE-2025", description: "Backend Java Cohort" },
    { name: "FS-2026", description: "FullStack C# Cohort" },
    { name: "BE-2026", description: "Backend Java Cohort" },
  ]);

  console.log("Seeding identities...");
  const fakeIdentities = [];
  for (let i = 0; i < 5; i++) {
    fakeIdentities.push({
      id: `identity-${i}`,
      name: `${faker.person.firstName()} ${faker.person.lastName()}`,
      email: faker.internet.email(),
      clerkId: `clerk-${i}`,
      cohortId: "2",
    });
  }
  await db.insert(identities).values(fakeIdentities);

  console.log("Seeding complete!");
}

seed().catch((err) => {
  console.error("Seeding error:", err);
});
