import { db } from "@/db";
import { cohorts } from "./schema";
import { faker } from "@faker-js/faker";
import { identities } from "../iam/schema";
import { v4 as uuidv4 } from "uuid";

export async function seedCohorts() {
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
      id: uuidv4(),
      name: `${faker.person.firstName()} ${faker.person.lastName()}`,
      email: faker.internet.email(),
      clerkId: `clerk-${i}`,
      cohortId: null,
    });
  }
  await db.insert(identities).values(fakeIdentities);

  console.log("Seeding complete!");
}
