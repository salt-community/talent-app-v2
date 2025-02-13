import { Db } from "@/db";
import { createDevelopersRepository } from "./repository";
import { DeveloperProfileInsert } from "./schema";
import { SessionClaims } from "./types";
import { auth } from "@clerk/nextjs/server";
import { claim } from "./session";
import { developerProfilesService } from "./instance";

export function createDeveloperProfilesService(db: Db) {
  const repository = createDevelopersRepository(db);
  return {
    async getAll() {
      return await repository.getAll();
    },
    async getById(identityId: string) {
      return await repository.getById(identityId);
    },
    async getDeveloperById(identityId: string) {
      return await repository.getDeveloperById(identityId);
    },
    async getAllById(identityId: string) {
      return await repository.getAllById(identityId);
    },
    async add(developerProfile: DeveloperProfileInsert) {
      return await repository.add(developerProfile);
    },
    async delete(id: string) {
      await repository.delete(id);
    },
    async updateStatus(args: { id: string; status: string }) {
      await repository.updateStatus(args.id, args.status);
    },
    async getPublishedOrHighlightedDeveloperProfileIds() {
      return await repository.getPublishedOrHighlightedDeveloperProfileIds();
    },
    async getHighlightedDeveloperProfileIds() {
      const highlighted = await repository.getAll();
      return highlighted
        .filter((dev) => dev.status === "highlighted")
        .map((dev) => dev.id);
    },
    async createDeveloperProfile(id: string) {
      const { sessionClaims } = await auth();
      const claims = sessionClaims as SessionClaims;

      const { name, email } = claim(claims);
      if (!email) return;
      const developer = await developerProfilesService.add({
        name,
        email,
        identityId: id,
      });
      return {
        id: developer.id,
      };
    },
    async getIdentityIdByDeveloperProfileId(developerProfileId: string) {
      return await repository.getIdentityIdByDeveloperProfileId(
        developerProfileId
      );
    },
  };
}

export type DeveloperProfilesService = ReturnType<
  typeof createDeveloperProfilesService
>;
