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
    async deleteByIdentityId(identityId: string) {
      await repository.deleteByIdentityId(identityId);
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
      const slug = await this.generateUniqueSlug(name);
      if (!email) return;
      const developer = await developerProfilesService.add({
        name,
        slug,
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
    async generateUniqueSlug(name: string) {
      const slug = generateSlug(name);
      let uniqueSlug = slug;
      let count = 1;

      while (await repository.existsBySlug(uniqueSlug)) {
        uniqueSlug = `${slug}-${count}`;
        count++;
      }

      return uniqueSlug;
    },
    async getDeveloperProfileByIdentityId(identityId: string) {
      return await repository.getDeveloperProfileByIdentityId(identityId);
    },
    async updateMissingSlugs() {
      const developers = await repository.getAll();
      for (const developer of developers) {
        if (!developer.slug) {
          const newSlug = generateSlug(developer.name);
          console.log(`Updating ${developer.name} with slug: ${newSlug}`);
          await repository.insertSlug(developer.id, newSlug);
        }
      }
    },
  };
}
function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/-+/g, "-")
    .trim();
}

export type DeveloperProfilesService = ReturnType<
  typeof createDeveloperProfilesService
>;
