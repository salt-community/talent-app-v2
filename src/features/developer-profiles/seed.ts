import { faker } from "@faker-js/faker";
import { db } from "@/db";
import { createDevelopersService } from "./service";
import { DeveloperProfileInsert } from "./schema";
import { slugify } from "@/lib/utils";

const service = createDevelopersService(db);

export async function seedDeveloperProfiles() {
  const developers: DeveloperProfileInsert[] = [];
  for (let i = 0; i < 10; i++) {
    const name = faker.person.fullName();
    developers.push({
      name,
      email: faker.internet.email(),
      slug: slugify(name),
    });
  }

  for (const developer of developers) {
    await service.add(developer);
  }
}
