import { IdentityInsert } from "./schema";
import { createService } from "./service";
import { createRepository } from "./repository";
import { db } from "@/db";

const service = createService(createRepository(db));
export async function seedIdentities() {
  const identities: IdentityInsert[] = [];

  for (let i = 1; i < 5; i++) {
    identities.push({
      clerkId: 1,
    });
  }
  for (const identity of identities) {
    await service.addIdentity(identity);
  }
}
