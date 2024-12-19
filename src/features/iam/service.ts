import { checkAccess } from "./check-access";
import { createRepository } from "./repository";
import { IdentityInsert } from "./schema";
import { Db } from "@/db";
import { ROLES } from "./roles";
import { auth } from "@clerk/nextjs/server";

type Role = keyof typeof ROLES;
type Permission = (typeof ROLES)[Role][number];

export function createService(db: Db) {
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

      const id = await repository.getUserId(userId);
      if (id) return;

      const primaryEmail = sessionClaims?.primaryEmail as string;
                        
      if (primaryEmail.split("@")[1] === "appliedtechnology.se") {
        await repository.addIdentity({ clerkId: userId });
      }
    },

    async addIdentity(identity: IdentityInsert) {
      await repository.addIdentity(identity);
    },
    async checkAccess(permission: Permission): Promise<boolean> {
      const { userId } = await auth();
      if (userId) {
        const roles = await repository.getIdentityRole(userId);
        checkAccess(roles, permission);
        return true;
      }
      return false;
    },
  };
}
