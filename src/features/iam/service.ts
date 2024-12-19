import { checkAccess } from "./check-access";
import { createRepository } from "./repository";
import { IdentityInsert } from "./schema";
import { Db } from "@/db";
import { ROLES } from "./roles";
import { auth } from "@clerk/nextjs/server";
import {
  BackgroundInsert,
  Developer,
  DeveloperProfileInsert,
  SessionClaims,
} from "@/features";
import { validateSessionClaims } from "./logic";
import { claim } from "./session";

type Role = keyof typeof ROLES;
type Permission = (typeof ROLES)[Role][number];

export function createService(
  db: Db,
  addDeveloper: (
    developerProfile: DeveloperProfileInsert
  ) => Promise<Developer>,
  addDeveloperBackground: (background: BackgroundInsert) => Promise<void>
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
      const SALT_DOMAIN = "appliedtechnology.se";
      const { userId, sessionClaims } = await auth();

      if (!userId) return;

      const existingUser = await repository.getUserId(userId);

      if (existingUser) {
        return existingUser;
      }

      const claims = sessionClaims as SessionClaims;
      if (!validateSessionClaims(claims)) {
        return;
      }
      const { domain } = claim(claims);

      if (domain === SALT_DOMAIN) {
        const newUser = await repository.addIdentity({ clerkId: userId });

        return newUser;
      }
    },

    async createDeveloperProfile(id: string) {
      const { sessionClaims } = await auth();
      const claims = sessionClaims as SessionClaims;

      const { name, email } = claim(claims);
      const developer = await addDeveloper({
        name,
        email,
        identityId: id,
      });

      await addDeveloperBackground({
        name,
        devId: developer.id,
        title: "",
        bio: "",
        links: [],
        skills: [],
        languages: [],
        educations: [],
      });
      return {
        id: developer.id,
      };
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
