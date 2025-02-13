import { iamService } from "./instance";
import { faker } from "@faker-js/faker";
import { IdentityInsert } from "./schema";

export async function seedIdentities() {
  console.log("Starting to seed identities...");

  const identities: IdentityInsert[] = [];

  for (let i = 1; i < 30; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    identities.push({
      clerkId: "##clerk_id##",
      name: `${firstName} ${lastName}`,
      email: faker.internet.email({
        firstName: firstName,
        lastName: lastName,
        provider: "appliedtechnology.se",
      }),
    });
  }

  const identityIds: string[] = [];

  for (const identity of identities) {
    identityIds.push((await iamService.addIdentity(identity)).id);
  }

  console.log("Done seeding identities!");

  return identityIds;
}
