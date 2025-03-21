import { Db } from "@/db";
import { auth } from "@clerk/nextjs/server";
import { createDevelopersRepository } from "./repository";
import { claim } from "./session";
import {
  AddDeveloperProfile,
  developerProfileDetails,
  OutboxMessageSelect,
  SessionClaims,
  updateDeveloperProfile,
} from "./types";
import { GetCurrentUser } from "../iam";
import { createSearchApi } from "./backgrounds-search";
import { TaskStatus } from "meilisearch";
import { createBackgroundsSearchService } from "./backgrounds-search/backgrounds-search-service";
import { generateSlug } from "./logic";
import { GetCohortIdByIdentityId } from "../cohorts";
import {
  GetAssignmentBySlug,
  GetAverageScoresByIdentityId,
  GetScoredAssignmentsByCohortIdAndIdentityId,
} from "../assignments";

const OK_STATUSES: TaskStatus[] = ["succeeded", "enqueued", "processing"];

export function createDeveloperProfilesService(
  db: Db,
  getCurrentUser: GetCurrentUser,
  getCohortIdByIdentityId: GetCohortIdByIdentityId,
  getScoredAssignmentsByCohortIdAndIdentityId: GetScoredAssignmentsByCohortIdAndIdentityId,
  getAssignmentBySlug: GetAssignmentBySlug,
  getAverageScoresByIdentityId: GetAverageScoresByIdentityId,
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
        const developerProfile = await repository.getDeveloperProfileById(
          outboxMessage.developerProfileId,
        );
        if (!developerProfile) {
          succeeded = true;
          break;
        }
        const upsertStatus = await backgroundsSearchApi.upsertDocuments([
          developerProfile[0],
        ]);
        succeeded = OK_STATUSES.includes(upsertStatus);
        break;
      case "delete":
        const deleteStatus = await backgroundsSearchApi.deleteDocument(
          outboxMessage.developerProfileId,
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
      return await repository.getAllDeveloperProfileIdsByIdentityId(identityId);
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
        currentUser.id,
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
          identityId: "",
          title: "",
          bio: "",
          headline: "",
          links: [],
          skills: [],
          languages: [],
          educations: [],
          jobs: [],
        } as T;
      }
      return developerProfile;
    },
    async getAllSkills() {
      return (await repository.getAllSkills()).filter(
        (skill, index, array) =>
          array.findIndex((s) => s.name === skill.name) === index,
      );
    },
    async getAllLanguages() {
      return (await repository.getAllLanguages()).filter(
        (language, index, array) =>
          array.findIndex((l) => l.name === language.name) === index,
      );
    },
    async getAllEducations() {
      return (await repository.getAllEducations()).filter(
        (education, index, array) =>
          array.findIndex((e) => e.name === education.name) === index,
      );
    },
    async delete(id: string) {
      await repository.deleteDeveloperProfile(id);
    },
    async deleteByIdentityId(identityId: string) {
      await repository.deleteDeveloperProfileByIdentityId(identityId);
    },
    async deleteMeiliSearchDocument(developerProfileId: string) {
      await backgroundsSearchApi.deleteDocument(developerProfileId);
    },
    async updateStatus(args: { id: string; status: string }) {
      const developerProfile = {
        id: args.id,
        status: args.status,
      };
      await repository.updateDeveloperProfile(developerProfile);
    },
    async updateMissingSlugs() {
      const developers = await repository.getAll();
      for (const developer of developers) {
        if (!developer.slug) {
          const newSlug = generateSlug(developer.name);
          await repository.updateDeveloperProfile({
            id: developer.id,
            slug: newSlug,
          });
        }
      }
    },
    async updateDeveloperProfile(
      developerProfileUpdates: updateDeveloperProfile,
    ) {
      const { outboxMessageId } = await repository.updateDeveloperProfile(
        developerProfileUpdates,
      );
      const developerProfile = await repository.getDeveloperProfileById(
        developerProfileUpdates.id,
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
      const developerProfiles = await repository.getAllDeveloperProfiles();
      await backgroundsSearchApi.upsertDocuments(developerProfiles);
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

      await repository.addDeveloperProfile(developerProfile);
    },
    async addDeveloperProfileDetails(
      developerProfileDetails: developerProfileDetails,
    ) {
      await repository.addDeveloperProfileDetails(developerProfileDetails);
    },
    async addDeveloperProfile(developerProfile: AddDeveloperProfile) {
      await repository.addDeveloperProfile(developerProfile);
    },
    async getScoredAssignmentsByIdentityId(identityId: string) {
      const cohortId = await getCohortIdByIdentityId(identityId);

      const assignments = cohortId
        ? await getScoredAssignmentsByCohortIdAndIdentityId({
            cohortId,
            identityId,
          })
        : [];

      // Group scores by assignment ID
      const assignmentMap = new Map();

      assignments.forEach(({ assignments, assignment_scores }) => {
        if (!assignmentMap.has(assignments.id)) {
          assignmentMap.set(assignments.id, {
            ...assignments,
            scores: [],
          });
        }

        assignmentMap.get(assignments.id).scores.push(assignment_scores);
      });

      const result = Array.from(assignmentMap.values());

      return result;
    },

    async getAssignmentBySlug(slug: string) {
      return await getAssignmentBySlug(slug);
    },

    async getAverageScoresByIdentityId(identityId: string) {
      return await getAverageScoresByIdentityId(identityId);
    },
  };
}

export type DeveloperProfilesService = ReturnType<
  typeof createDeveloperProfilesService
>;
