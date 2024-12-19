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

type Role = keyof typeof ROLES;
type Permission = (typeof ROLES)[Role][number];

export function createService(
  db: Db,
  addDeveloper: (
    developerProfile: DeveloperProfileInsert
  ) => Promise<Developer>,
  getDeveloperId: (identityId: string) => Promise<string>,
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
        const developerId = await getDeveloperId(existingUser.id);
        return { id: developerId, role: existingUser.role };
      }

      const claims = sessionClaims as SessionClaims;
      if (!validateSessionClaims(claims)) {
        return;
      }

      const { first_name, last_name, email } = claims;
      const name = `${first_name} ${last_name}`;
      const domain = email?.split("@")[1];

      console.log("domain", name);
      if (domain === SALT_DOMAIN) {
        const newUser = await repository.addIdentity({ clerkId: userId });

        return newUser;
      }
    },

    async createDeveloperProfile(
      identityId: string,
      name: string,
      email: string
    ) {
      const developer = await addDeveloper({
        name,
        email,
        identityId,
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

    async checkAccess(permission: Permission) {
      const { userId } = await auth();
      if (userId) {
        const roles = await repository.getIdentityRole(userId);
        return checkAccess(roles, permission);
      }
    },
  };
}
