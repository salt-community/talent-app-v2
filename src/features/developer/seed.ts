import { faker } from "@faker-js/faker";
import { DeveloperProfileInsert } from "./schema";
import { db } from "@/db";
import { createDeveloperService } from "./service";

const service = createDeveloperService(db);
export async function seedDeveloperProfiles() {
  const developers: DeveloperProfileInsert[] = [];

  for (let i = 0; i < 10; i++) {
    developers.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
    });
    await service.addDeveloper(developers[i]);
  }
}
