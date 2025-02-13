import { iamService } from "./instance";
import { faker } from "@faker-js/faker";
import { IdentityInsert, IdentitySelect } from "./schema";

export async function seedIdentities() {
  console.log("Starting to seed identities...");

  const identitiesToInsert: IdentityInsert[] = [];

  for (let i = 1; i <= 30; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    identitiesToInsert.push({
      clerkId: "##clerk_id##",
      name: `${firstName} ${lastName}`,
      email: faker.internet.email({
        firstName: firstName,
        lastName: lastName,
        provider: "appliedtechnology.se",
      }),
    });
  }

  const createdIdentities: IdentitySelect[] = [];

  for (const identity of identitiesToInsert) {
    createdIdentities.push(await iamService.addIdentity(identity));
  }

  console.log("Done seeding identities!");

  return createdIdentities;
}
