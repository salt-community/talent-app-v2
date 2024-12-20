import { iamService } from "./instance";
import { IdentityInsert } from "./schema";

// const service = createService(db);
export async function seedIdentities() {
  const identities: IdentityInsert[] = [];

  for (let i = 1; i < 5; i++) {
    identities.push({
      clerkId: "user_2qIgrR7X8WTqJVw1tI8SZtjXeUH",
    });
  }
  for (const identity of identities) {
    await iamService.addIdentity(identity);
  }
}
