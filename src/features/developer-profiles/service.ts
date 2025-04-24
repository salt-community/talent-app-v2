import { Db } from "@/db";
import { auth } from "@clerk/nextjs/server";
import { createDevelopersRepository } from "./repository";
import { claim } from "./session";
import {
  AddDeveloperProfile,
  developerProfileDetails,
  DeveloperProfileUpdate,
  OutboxMessageSelect,
  SessionClaims,
} from "./types";
import { GetCurrentUser } from "../iam";
import { createSearchApi } from "./search";
import { TaskStatus } from "meilisearch";
import { createSearchService } from "./search/search-service";
import { generateSlug } from "./logic";
import {
  GetAssignmentBySlug,
  GetAverageScoresByIdentityId,
  GetScoredAssignmentsByCohortIdAndIdentityId,
} from "../assignments";

const OK_STATUSES: TaskStatus[] = ["succeeded", "enqueued", "processing"];

export function createDeveloperProfilesService(
  db: Db,
  getCurrentUser: GetCurrentUser,
  getScoredAssignmentsByCohortIdAndIdentityId: GetScoredAssignmentsByCohortIdAndIdentityId,
  getAssignmentBySlug: GetAssignmentBySlug,
  getAverageScoresByIdentityId: GetAverageScoresByIdentityId
) {
  const repository = createDevelopersRepository(db);
  const searchApi = createSearchApi({
    indexUid: "backgrounds",
    primaryKey: "id",
    displayedAttributes: ["id"],

    searchableAttributes: [
      "title",
      "title",
      "skills",
      "jobs",
      "jobs",
      "educations",
      "bio",
      "bio",
      "languages",
      "name",
    ],
    embedders:
      process.env.FF_SEMANTIC_SEARCH_ENABLED === "ON"
        ? {
            openAiSearch: {
              source: "openAi",
              model: "text-embedding-3-large",
              apiKey: process.env.OPENAI_API_KEY,
              dimensions: 3072,

              documentTemplate: `
              {{doc.title}}, bio: {{doc.bio}} with skills: {{doc.skills}}, jobs: {{doc.jobs}},
              education: {{doc.educations}}, who speaks languages: {{doc.languages}}`,
            },
          }
        : undefined,
    filterableAttributes: ["status"],
  });

  const searchService = createSearchService(searchApi);

  async function syncSearchWithOutboxMessage(
    outboxMessage: OutboxMessageSelect
  ) {
    let succeeded = false;
    switch (outboxMessage.operation) {
      case "upsert":
        const developerProfile = await repository.getDeveloperProfile(
          outboxMessage.developerProfileId
        );
        if (!developerProfile) {
          succeeded = true;
          break;
        }
        const upsertStatus = await searchApi.upsertDocuments([
          developerProfile[0],
        ]);
        succeeded = OK_STATUSES.includes(upsertStatus);
        break;
      case "delete":
        const deleteStatus = await searchApi.deleteDocument(
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
    ...searchService,
    ...searchService,
    async getAll() {
      return await repository.getAll();
    },

    async getDeveloperById(identityId: string) {
      return await repository.getDeveloperById(identityId);
    },
    async getDeveloperBySlug(slug: string) {
      return await repository.getDeveloperBySlug(slug);
    },

    async getAllById(identityId: string) {
      return await repository.getAllDeveloperProfileIdsByIdentityId(identityId);
    },
    async getHighlightedDeveloperProfiles() {
      const highlighted = await repository.getAll();
      return highlighted
        .filter((dev) => dev.status === "highlighted")
        .map((dev) => ({ id: dev.id, slug: dev.slug }));
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
    async getDeveloperProfileById(developerProfileId: string) {
      const [developerProfile] =
        await repository.getDeveloperProfile(developerProfileId);
      type T = typeof developerProfile;

      if (!developerProfile) {
        return {
          id: "",
          avatarUrl: "",
          name: "<New Profile>",
          email: "",
          slug: "",

          identityId: "",
          title: "",
          bio: "",
          links: [],
          skills: [],
          languages: [],
          educations: [],
          jobs: [],
          status: "unpublished",
          headerLanguage: "english",
        } as T;
      }
      return developerProfile;
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
      await repository.deleteDeveloperProfile(id);
    },
    async deleteByIdentityId(identityId: string) {
      await repository.deleteDeveloperProfileByIdentityId(identityId);
    },
    async deleteDeveloperProfileFromSearch(developerProfileId: string) {
      await searchApi.deleteDocument(developerProfileId);
    },
    async updateMissingSlugs() {
      const developers = await repository.getAll();
      for (const developer of developers) {
        if (!developer.slug) {
          const newSlug = generateSlug(developer.name);
          await repository.updateDeveloperProfileDetails({
            id: developer.id,
            slug: newSlug,
          });
        }
      }
    },
    async updateDeveloperProfile(
      developerProfileUpdates: DeveloperProfileUpdate
    ) {
      const outboxMessage = await repository.updateDeveloperProfileDetails(
        developerProfileUpdates
      );
      syncSearchWithOutboxMessage(outboxMessage);
      syncSearchWithOutboxMessage(outboxMessage);
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
    async syncSearch() {
      const outboxMessages = await repository.getAllOutboxMessage();
      for (const outboxMessage of outboxMessages) {
        await syncSearchWithOutboxMessage(outboxMessage);
        await syncSearchWithOutboxMessage(outboxMessage);
      }
    },
    async repopulateSearch() {
      await searchApi.deleteIndex();
      await searchApi.ensureIndex();
      const developerProfiles = await repository.getAllDeveloperProfiles();
      await searchApi.upsertDocuments(developerProfiles);
    },
    async isSearchSyncRequired() {
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

      const outboxMessage =
        await repository.addDeveloperProfile(developerProfile);
      syncSearchWithOutboxMessage(outboxMessage);
    },
    async addDeveloperProfileDetails(
      developerProfileDetails: developerProfileDetails
    ) {
      await repository.addDeveloperProfileDetails(developerProfileDetails);
    },

    async addDeveloperProfile(developerProfile: AddDeveloperProfile) {
      const outboxMessage =
        await repository.addDeveloperProfile(developerProfile);
      syncSearchWithOutboxMessage(outboxMessage);
    },

    async getScoredAssignmentsByIdentityId(identityId: string) {
      const assignments =
        await getScoredAssignmentsByCohortIdAndIdentityId(identityId);

      return assignments;
    },

    async getAssignmentBySlug(slug: string) {
      return await getAssignmentBySlug(slug);
    },

    async getAverageScoresByIdentityId(identityId: string) {
      const averageScores = await getAverageScoresByIdentityId(identityId);
      const scoreMap = new Map();
      averageScores.forEach((item) => {
        scoreMap.set(item.assignmentId, item.averageScore);
      });
      return scoreMap;
    },

    async copyDeveloperProfile(developerProfileId: string) {
      const [developerProfileToCopy] =
        await repository.getDeveloperProfile(developerProfileId);
      developerProfileToCopy.slug = await this.generateUniqueSlug(
        developerProfileToCopy.name
      );
      await repository.copyDeveloperProfile(developerProfileToCopy);
    },
  };
}
export type DeveloperProfilesService = ReturnType<
  typeof createDeveloperProfilesService
>;
