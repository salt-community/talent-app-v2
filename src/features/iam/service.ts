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
  IdentityRole,
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
  getById: (id: string) => Promise<string>,
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

    async updateRole(id: string, newRole: IdentityRole) {
      await repository.updateRole(id, newRole);
    },

    async controlUser() {
      const SALT_DOMAIN = "appliedtechnology.se";
      const { userId, sessionClaims } = await auth();

      if (!userId) {
        return { id: "", role: "not signed in" };
      }

      const existingUser = await repository.getUserId(userId);

      if (existingUser) {
        return existingUser;
      }

      const claims = sessionClaims as SessionClaims;
      if (!validateSessionClaims(claims)) {
        return;
      }

      const { name, email, domain } = claim(claims);

      if (domain === SALT_DOMAIN) {
        if (!email) return;
        const newUser = await repository.addIdentity({
          name: name,
          email: email,
          clerkId: userId,
        });
        return newUser;
      }
    },

    async createDeveloperProfile(id: string) {
      const { sessionClaims } = await auth();
      const claims = sessionClaims as SessionClaims;

      const { name, email } = claim(claims);
      if (!email) return;
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

    async checkUserAccess(devId: string) {
      const { userId } = await auth();
      if (!userId) return false;

      const identityId = await repository.getIdentityRole(userId);
      const developerId = await getById(identityId.id);
      if (developerId === devId) return true;
      return false;
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
