import { faker } from "@faker-js/faker";
import { db } from "@/db";
import { createDeveloperProfilesService } from "./service";
import { DeveloperProfileInsert } from "./schema";

const service = createDeveloperProfilesService(db);
export async function seedDeveloperProfiles() {
  const developers: DeveloperProfileInsert[] = [];
  for (let i = 0; i < 10; i++) {
    developers.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
    });
  }

  for (const developer of developers) {
    await service.add(developer);
  }
}
