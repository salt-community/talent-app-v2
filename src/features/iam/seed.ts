import { iamService } from "./instance";
import { faker } from "@faker-js/faker";
import { IdentityInsert } from "./schema";

export async function seedIdentities() {
  const identities: IdentityInsert[] = [];

  for (let i = 1; i < 5; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    identities.push({
      clerkId: "user_2qIgrR7X8WTqJVw1tI8SZtjXeUH",
      name: `${firstName} ${lastName}`,
      email: faker.internet.email({
        firstName: firstName,
        lastName: lastName,
        provider: "appliedtechnology.se",
      }),
    });
  }
  for (const identity of identities) {
    await iamService.addIdentity(identity);
  }
}
