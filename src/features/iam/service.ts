import { checkAccess } from "./check-access";
import { createRepository } from "./repository";
import { IdentityInsert } from "./schema";
import { Db } from "@/db";
import { ROLES } from "./roles";
import { auth } from "@clerk/nextjs/server";
import { DeveloperProfileInsert } from "@/features";

type Role = keyof typeof ROLES;
type Permission = (typeof ROLES)[Role][number];

export function createService(
  db: Db,
  addDeveloper: (developerProfile: DeveloperProfileInsert) => Promise<void>
) {
  const repository = createRepository(db);
  return {
    async getAllIdentities() {
      return repository.getAllIdentities();
    },

    async getIdentityById(id: string) {
      return await repository.getIdentityById(id);
    },

    async controlUser() {
      const { userId, sessionClaims } = await auth();

      if (!userId) return;

      const user = await repository.getUserId(userId);
      if (user) return user;

      const { first_name, last_name } = sessionClaims;
      const primaryEmail = sessionClaims?.email as string;
      if (primaryEmail.split("@")[1] === "appliedtechnology.se") {
        const user = await repository.addIdentity({ clerkId: userId });
        await addDeveloper({
          name: `${first_name} ${last_name}`,
          email: primaryEmail,
          identityId: user.id,
        });
        return user;
      }
    },

    async addIdentity(identity: IdentityInsert) {
      await repository.addIdentity(identity);
    },
    async checkAccess(permission: Permission) {
      const { userId } = await auth();
      if (userId) {
        const roles = await repository.getIdentityRole(userId);
        return checkAccess(roles, permission);
      }
    },
  };
}
