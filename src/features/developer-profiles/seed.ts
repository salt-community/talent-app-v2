import { faker } from "@faker-js/faker";
import { db } from "@/db";
import { createDevelopersService } from "./service";
import { DeveloperProfileInsert } from "./schema";

const service = createDevelopersService(db);
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
