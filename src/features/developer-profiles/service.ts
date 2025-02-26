import { Db } from "@/db";
import { auth } from "@clerk/nextjs/server";
import { developerProfilesService } from "./instance";
import { createDevelopersRepository } from "./repository";
import { claim } from "./session";
import {
  BackgroundInsert,
  BackgroundUpdate,
  DeveloperProfileInsert,
  OutboxMessageSelect,
  SessionClaims,
} from "./types";
import { GetCurrentUser } from "../iam";
import { createBackgroundsService } from "./background-service";
import { createRepository } from "./background-repository";
import { createSearchApi } from "./backgrounds-search";
import { TaskStatus } from "meilisearch";
import { createBackgroundsSearchService } from "./backgrounds-search/backgrounds-search-service";

const OK_STATUSES: TaskStatus[] = ["succeeded", "enqueued", "processing"];

export function createDeveloperProfilesService(
  db: Db,
  getCurrentUser: GetCurrentUser
) {
  const repository = createDevelopersRepository(db);
  const backgroundRepository = createRepository(db);
  const backgroundsSearchApi = createSearchApi({
    indexUid: "backgrounds",
    primaryKey: "developerProfileId",
    displayedAttributes: ["developerProfileId"],
    searchableAttributes: [
      "skills",
      "educations",
      "languages",
      "name",
      "title",
      "bio",
    ],
  });

  const backgroundsService = createBackgroundsService(
    backgroundRepository,
    backgroundsSearchApi
  );
  const backgroundsSearchService =
    createBackgroundsSearchService(backgroundsSearchApi);

  async function updateMeilisearchFor(outboxMessage: OutboxMessageSelect) {
    let succeeded = false;
    switch (outboxMessage.operation) {
      case "upsert":
        const background =
          await backgroundRepository.getBackgroundByDeveloperProfileId(
            outboxMessage.developerProfileId
          );
        if (!background) {
          succeeded = true;
          break;
        }
        const upsertStatus = await backgroundsSearchApi.upsertDocuments([
          background[0],
        ]);
        succeeded = OK_STATUSES.includes(upsertStatus);
        break;
      case "delete":
        const deleteStatus = await backgroundsSearchApi.deleteDocument(
          outboxMessage.developerProfileId
        );
        succeeded = OK_STATUSES.includes(deleteStatus);
        break;
    }
    if (succeeded) {
      await backgroundRepository.removeOutboxMessage(outboxMessage.id);
    }
  }

  return {
    ...backgroundsService,
    ...backgroundsSearchService,
    async getAll() {
      return await repository.getAll();
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
    async getCurrentUsers() {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        return;
      }

      const developerProfile = await this.getDeveloperProfileByIdentityId(
        currentUser.id
      );
      const user = {
        ...currentUser,
        developerProfile,
      };
      return user;
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
    //imported service functions from backgrounds
    async syncMeilisearch() {
      const outboxMessages = await backgroundRepository.getAllOutboxMessage();
      for (const outboxMessage of outboxMessages) {
        updateMeilisearchFor(outboxMessage);
      }
    },
    async getBackgroundByDeveloperProfileId(developerProfileId: string) {
      const [background] =
        await backgroundRepository.getBackgroundById(developerProfileId);

      type T = typeof background;

      if (!background) {
        return {
          id: -1,
          avatarUrl: "",
          name: "<New Profile>",
          developerProfileId,
          title: "",
          bio: "",
          links: [],
          skills: [],
          languages: [],
          educations: [],
        } as T;
      }

      return background;
    },
    async getAllSkills() {
      return (await backgroundRepository.getAllSkills()).filter(
        (skill, index, array) =>
          array.findIndex((s) => s.name === skill.name) === index
      );
    },
    async getAllLanguages() {
      return (await backgroundRepository.getAllLanguages()).filter(
        (language, index, array) =>
          array.findIndex((l) => l.name === language.name) === index
      );
    },
    async getAllEducations() {
      return (await backgroundRepository.getAllEducations()).filter(
        (education, index, array) =>
          array.findIndex((e) => e.name === education.name) === index
      );
    },
    async addBackground(background: BackgroundInsert) {
      const { outboxMessageId, backgroundId } =
        await backgroundRepository.add(background);

      const status = await backgroundsSearchApi.upsertDocuments([
        { id: backgroundId, ...background },
      ]);
      if (OK_STATUSES.includes(status)) {
        await backgroundRepository.removeOutboxMessage(outboxMessageId);
      }
    },
    async updateBackground(background: BackgroundUpdate) {
      const { outboxMessageId } = await backgroundRepository.update(background);

      const status = await backgroundsSearchApi.upsertDocuments([background]);
      if (OK_STATUSES.includes(status)) {
        await backgroundRepository.removeOutboxMessage(outboxMessageId);
      }
    },
    async repopulateMeiliSearch() {
      await backgroundsSearchApi.deleteIndex();
      await backgroundsSearchApi.ensureIndex();

      const backgrounds = await backgroundRepository.getAllBackgrounds();

      await backgroundsSearchApi.upsertDocuments(backgrounds);
    },
  };
}

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[åä]/g, "a")
    .replace(/ö/g, "o")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/-+/g, "-")
    .trim();
}
export type DeveloperProfilesService = ReturnType<
  typeof createDeveloperProfilesService
>;
