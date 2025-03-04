import { Db } from "@/db";
import { auth } from "@clerk/nextjs/server";
import { developerProfilesService } from "./instance";
import { createDevelopersRepository } from "./repository";
import { claim } from "./session";
import {
  BackgroundForDeveloperProfile,
  BackgroundInsert,
  BackgroundUpdate,
  DeveloperProfileInsert,
  OutboxMessageSelect,
  SessionClaims,
} from "./types";
import { GetCurrentUser } from "../iam";
import { createSearchApi } from "./backgrounds-search";
import { TaskStatus } from "meilisearch";
import { createBackgroundsSearchService } from "./backgrounds-search/backgrounds-search-service";
import { v4 as uuidv4 } from "uuid";

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
  });

  const backgroundsSearchService =
    createBackgroundsSearchService(backgroundsSearchApi);

  async function updateMeilisearchFor(outboxMessage: OutboxMessageSelect) {
    let succeeded = false;
    switch (outboxMessage.operation) {
      case "upsert":
        const background = await repository.getBackgroundByDeveloperProfileId(
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
    async addDeveloperProfile(developerProfile: DeveloperProfileInsert) {
      // double write to tempDeveloperProfile
      const developerProfileId =
        await repository.addDeveloperProfile(developerProfile);
      const backgrounds = {
        developerProfileId: developerProfileId.id,
        avatarUrl: "",
        title: "",
        bio: "",
        links: [],
      };
      await this.addTempDeveloperProfile({ developerProfile, backgrounds });
      return developerProfileId;
    },
    async delete(id: string) {
      //double write to tempDeveloperProfile
      await repository.deleteTempDeveloperProfile(id);
      await repository.deleteDeveloperProfile(id);
    },
    async deleteByIdentityId(identityId: string) {
      //double write to tempDeveloperProfile
      await repository.deleteTempDeveloperProfileByIdentityId(identityId);
      await repository.deleteByIdentityId(identityId);
    },
    async updateStatus(args: { id: string; status: string }) {
      //double write to tempDeveloperProfile
      const developerProfile = {
        id: args.id,
        status: args.status,
      };

      await repository.updateTempDeveloperProfile(developerProfile, {
        developerProfileId: args.id,
      });
      await repository.updateStatus(args.id, args.status);
    },
    async createDeveloperProfile(identityId: string) {
      const { sessionClaims } = await auth();
      const claims = sessionClaims as SessionClaims;

      const { name, email } = claim(claims);
      if (!email) return;

      const slug = await this.generateUniqueSlug(name);
      const developerProfileId = uuidv4();
      const developerProfile = {
        id: developerProfileId,
        identityId,
        name,
        email,
        slug,
      };

      const developer =
        await developerProfilesService.addDeveloperProfile(developerProfile);
      await this.addTempDeveloperProfile({
        developerProfile,
        backgrounds: { developerProfileId },
      });

      return { id: developer.id };
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
          await repository.insertSlug(developer.id, newSlug);
          //double write to tempDeveloperProfiles
          await repository.updateTempDeveloperProfile(
            { id: developer.id, slug: newSlug },
            { developerProfileId: developer.id }
          );
        }
      }
    },
    //imported service functions from backgrounds
    async syncMeilisearch() {
      const outboxMessages = await repository.getAllOutboxMessage();
      for (const outboxMessage of outboxMessages) {
        updateMeilisearchFor(outboxMessage);
      }
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
    async addBackground(background: BackgroundInsert) {
      const { outboxMessageId } = await repository.addBackground(background);
      const developerProfileId = await repository.updateTempDeveloperProfile(
        {},
        background
      );
      const developerProfile =
        await repository.getBackgroundByDeveloperProfileId(
          developerProfileId[0].id
        );
      const status = await backgroundsSearchApi.upsertDocuments([
        developerProfile[0],
      ]);
      if (OK_STATUSES.includes(status)) {
        await repository.removeOutboxMessage(outboxMessageId);
      }
    },
    async updateBackground(background: BackgroundUpdate) {
      //double write to temp developerProfiles
      const developerProfileId = await repository.updateTempDeveloperProfile(
        {},
        background
      );
      const developerProfile =
        await repository.getBackgroundByDeveloperProfileId(
          developerProfileId[0].id
        );
      const { outboxMessageId } = await repository.updateBackground(background);

      const status = await backgroundsSearchApi.upsertDocuments([
        developerProfile[0],
      ]);
      if (OK_STATUSES.includes(status)) {
        await repository.removeOutboxMessage(outboxMessageId);
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
    async deleteBackgroundById(developerProfileId: string) {
      await repository.deleteBackgroundById(developerProfileId);
    },
    async deleteMeiliSearchDocument(developerProfileId: string) {
      await backgroundsSearchApi.deleteDocument(developerProfileId);
    },
    async addTempDeveloperProfile(args: {
      developerProfile: DeveloperProfileInsert;
      backgrounds: BackgroundForDeveloperProfile;
    }) {
      await repository.addTempDeveloperProfile(
        args.developerProfile,
        args.backgrounds
      );
    },
    //can be removed after merge is completed
    async getAllBackgrounds() {
      return await repository.getAllBackgroundIds();
    },
    //can be removed after merge is completed
    async getBackgroundById(id: string) {
      return await repository.getBackground(id);
    },
    //can be removed after merge is completed
    async updateForeignKey(args: {
      backgroundId: number;
      developerProfileId: string;
    }) {
      await repository.updateForeignKey(
        args.backgroundId,
        args.developerProfileId
      );
    },
    async getHighlightedDeveloperProfileIds() {
      const highlighted = await repository.getAll();
      return highlighted
        .filter((dev) => dev.status === "highlighted")
        .map((dev) => dev.id);
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
