import { Repository } from "./repository";
import {
  BackgroundInsert,
  BackgroundUpdate,
  OutboxMessageSelect,
} from "./types";
import { BackgroundsSearchApi } from "./backgrounds-search";
import { TaskStatus } from "meilisearch";
import { createBackgroundsSearchService } from "./backgrounds-search/backgrounds-search-service";

const OK_STATUSES: TaskStatus[] = ["succeeded", "enqueued", "processing"];
export function createBackgroundsService(
  repository: Repository,
  backgroundsSearchApi: BackgroundsSearchApi
) {
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
        const upsertStatus = await backgroundsSearchApi.upsertBackgrounds([
          background[0],
        ]);
        succeeded = OK_STATUSES.includes(upsertStatus);
        break;
      case "delete":
        const deleteStatus = await backgroundsSearchApi.deleteBackground(
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
    async getBackgroundByDeveloperProfileId(developerProfileId: string) {
      const [background] =
        await repository.getBackgroundById(developerProfileId);

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
    async add(background: BackgroundInsert) {
      const { outboxMessageId, backgroundId } =
        await repository.add(background);

      const status = await backgroundsSearchApi.upsertBackgrounds([
        { id: backgroundId, ...background },
      ]);
      if (OK_STATUSES.includes(status)) {
        await repository.removeOutboxMessage(outboxMessageId);
      }
    },

    async update(background: BackgroundUpdate) {
      const { outboxMessageId } = await repository.update(background);

      const status = await backgroundsSearchApi.upsertBackgrounds([background]);
      if (OK_STATUSES.includes(status)) {
        await repository.removeOutboxMessage(outboxMessageId);
      }
    },

    async repopulateMeiliSearch() {
      await backgroundsSearchApi.deleteAllBackgrounds();

      const backgrounds = await repository.getAllBackgrounds();

      await backgroundsSearchApi.upsertBackgrounds(backgrounds);
    },
    async syncMeilisearch() {
      const outboxMessages = await repository.getAllOutboxMessage();
      for (const outboxMessage of outboxMessages) {
        updateMeilisearchFor(outboxMessage);
      }
    },
    async doesMeilisearchNeedSync() {
      return (await repository.getAllOutboxMessage()).length > 0;
    },

    async deleteBackgroundById(developerProfileId: string) {
      await repository.deleteBackgroundById(developerProfileId);
    },
  };
}
