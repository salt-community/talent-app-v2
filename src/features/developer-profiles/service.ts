import { Db } from "@/db";
import { auth } from "@clerk/nextjs/server";
import { developerProfilesService } from "./instance";
import { createDevelopersRepository } from "./repository";
import { claim } from "./session";
import {
  AddDeveloperProfile,
  BackgroundInsert,
  OutboxMessageSelect,
  SessionClaims,
  updateTempDeveloperProfile,
} from "./types";
import { GetCurrentUser } from "../iam";
import { createSearchApi } from "./backgrounds-search";
import { TaskStatus } from "meilisearch";
import { createBackgroundsSearchService } from "./backgrounds-search/backgrounds-search-service";
import { v4 as uuidv4 } from "uuid";
import { DeveloperProfileValidation } from "./validation";

const OK_STATUSES: TaskStatus[] = ["succeeded", "enqueued", "processing"];

export function createDeveloperProfilesService(
  db: Db,
  getCurrentUser: GetCurrentUser
) {
  const repository = createDevelopersRepository(db);
  const backgroundsSearchApi = createSearchApi({
    indexUid: "backgrounds",
    primaryKey: "id",
    displayedAttributes: ["id"],
    searchableAttributes: [
      "skills",
      "educations",
      "languages",
      "name",
      "title",
      "bio",
      "status",
    ],
    embedders:
      process.env.FF_SEMANTIC_SEARCH_ENABLED === "ON"
        ? {
            openAiSearch: {
              source: "openAi",
              model: "text-embedding-3-large",
              apiKey: process.env.OPENAI_API_KEY,
              dimensions: 3072,
              documentTemplate: `{{doc.title}} with skills: {{doc.skills}},
          education: {{doc.educations}}, languages: {{doc.languages}}, bio: {{doc.bio}}`,
            },
          }
        : undefined,
    filterableAttributes: ["status"],
  });

  const backgroundsSearchService =
    createBackgroundsSearchService(backgroundsSearchApi);

  async function updateMeilisearchFor(outboxMessage: OutboxMessageSelect) {
    let succeeded = false;
    switch (outboxMessage.operation) {
      case "upsert":
        const background = await repository.getDeveloperProfileById(
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
      await repository.removeOutboxMessage(outboxMessage.id);
    }
  }

  return {
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
    async getHighlightedDeveloperProfileIds() {
      const highlighted = await repository.getAll();
      return highlighted
        .filter((dev) => dev.status === "highlighted")
        .map((dev) => dev.id);
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
    async getBackgroundByDeveloperProfileId(developerProfileId: string) {
      const [background] =
        await repository.getBackgroundById(developerProfileId);

      type T = typeof background;

      if (!background) {
        return {
          id: "",
          avatarUrl: "",
          name: "<New Profile>",
          identityId: "",
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
      return (await repository.getAllSkills()).filter(
        (skill, index, array) =>
          array.findIndex((s) => s.name === skill.name) === index
      );
    },
    async getAllLanguages() {
      return (await repository.getAllLanguages()).filter(
        (language, index, array) =>
          array.findIndex((l) => l.name === language.name) === index
      );
    },
    async getAllEducations() {
      return (await repository.getAllEducations()).filter(
        (education, index, array) =>
          array.findIndex((e) => e.name === education.name) === index
      );
    },
    async delete(id: string) {
      await repository.deleteTempDeveloperProfile(id);
    },
    async deleteByIdentityId(identityId: string) {
      await repository.deleteTempDeveloperProfileByIdentityId(identityId);
    },
    async deleteMeiliSearchDocument(developerProfileId: string) {
      await backgroundsSearchApi.deleteDocument(developerProfileId);
    },
    async updateStatus(args: { id: string; status: string }) {
      const developerProfile = {
        id: args.id,
        status: args.status,
      };
      await repository.updateTempDeveloperProfile(developerProfile);
    },
    async updateMissingSlugs() {
      const developers = await repository.getAll();
      for (const developer of developers) {
        if (!developer.slug) {
          const newSlug = generateSlug(developer.name);
          await repository.updateTempDeveloperProfile({
            id: developer.id,
            slug: newSlug,
          });
        }
      }
    },
    async updateDeveloperProfile(
      developerProfileUpdates: updateTempDeveloperProfile
    ) {
      const { outboxMessageId } = await repository.updateTempDeveloperProfile(
        developerProfileUpdates
      );
      console.log("updates:", developerProfileUpdates);
      const developerProfile = await repository.getDeveloperProfileById(
        developerProfileUpdates.id
      );

      const status = await backgroundsSearchApi.upsertDocuments([
        developerProfile[0],
      ]);
      if (OK_STATUSES.includes(status)) {
        await repository.removeOutboxMessage(outboxMessageId);
      }
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
    async syncMeilisearch() {
      const outboxMessages = await repository.getAllOutboxMessage();
      for (const outboxMessage of outboxMessages) {
        updateMeilisearchFor(outboxMessage);
      }
    },
    async repopulateMeiliSearch() {
      await backgroundsSearchApi.deleteIndex();
      await backgroundsSearchApi.ensureIndex();
      const backgrounds = await repository.getAllBackgrounds();
      await backgroundsSearchApi.upsertDocuments(backgrounds);
    },
    async doesMeilisearchNeedSync() {
      return (await repository.getAllOutboxMessage()).length > 0;
    },
    async createDeveloperProfile(identityId: string) {
      const { sessionClaims } = await auth();
      const claims = sessionClaims as SessionClaims;

      const { name, email } = claim(claims);
      if (!email) return;

      const slug = await this.generateUniqueSlug(name);

      const developerProfile = {
        identityId,
        name,
        email,
        slug,
        status: "unpublished",
      };

      await repository.addTempDeveloperProfile(developerProfile);
    },
    async addDeveloperProfileDetails(background: BackgroundInsert) {
      await repository.addDeveloperProfileDetails(background);
    },
    async addTempDeveloperProfile(developerProfile: AddDeveloperProfile) {
      await repository.addTempDeveloperProfile(developerProfile);
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
