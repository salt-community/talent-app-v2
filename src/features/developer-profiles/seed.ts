import { faker } from "@faker-js/faker";
import { db } from "@/db";
import { createDeveloperProfilesService } from "./service";
import { DeveloperProfileInsert } from "./schema";

const service = createDeveloperProfilesService(db);

export async function seedDeveloperProfiles() {
  console.log("Seeding developer profiles...");

  const developers: DeveloperProfileInsert[] = [];
  for (let i = 0; i < 10; i++) {
    developers.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
    });
  }

  const developerProfileIds: string[] = [];

  for (const developer of developers) {
    developerProfileIds.push((await service.add(developer)).id);
  }

  for (let i = 0; i < developerProfileIds.length; i++) {
    const id = developerProfileIds[i];
    const status = i < 5 ? ("highlighted" as const) : ("published" as const);

    await service.updateStatus({ id, status });
  }

  console.log("Done seeding developer profiles!");

  return developerProfileIds;
}
