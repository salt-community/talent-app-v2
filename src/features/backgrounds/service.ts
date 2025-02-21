import { Repository } from "./repository";
import {
  BackgroundInsert,
  BackgroundUpdate,
  OutboxMessageSelect,
} from "./types";
import { MeiliClient } from "./meili";
import { Settings, TaskStatus } from "meilisearch";

const OK_STATUSES: TaskStatus[] = ["succeeded", "enqueued", "processing"];
export function createBackgroundsService(
  repository: Repository,
  meiliClient: MeiliClient,
  getPublishedOrHighlightedDeveloperProfileIds: () => Promise<string[]>
) {
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
        const upsertStatus = await meiliClient.upsertBackground([
          background[0],
        ]);
        succeeded = OK_STATUSES.includes(upsertStatus);
        break;
      case "delete":
        const deleteStatus = await meiliClient.deleteBackground(
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

      const status = await meiliClient.upsertBackground([
        { id: backgroundId, ...background },
      ]);
      if (OK_STATUSES.includes(status)) {
        await repository.removeOutboxMessage(outboxMessageId);
      }
    },

    async update(background: BackgroundUpdate) {
      const { outboxMessageId } = await repository.update(background);

      const status = await meiliClient.upsertBackground([background]);
      if (OK_STATUSES.includes(status)) {
        await repository.removeOutboxMessage(outboxMessageId);
      }
    },

    async searchDeveloperProfileIds(search: string | undefined) {
      const cleanSearch = search?.trim();
      const [
        searchedDeveloperProfileIds,
        publishedOrHighlightedDeveloperProfileIds,
      ] = await Promise.all([
        !cleanSearch || cleanSearch === ""
          ? await repository.getAllDeveloperProfileIds()
          : await meiliClient.searchDeveloperProfileIds(search),
        await getPublishedOrHighlightedDeveloperProfileIds(),
      ]);

      const filteredDeveloperProfileIds = searchedDeveloperProfileIds.filter(
        (developerProfileId) =>
          publishedOrHighlightedDeveloperProfileIds.includes(developerProfileId)
      );
      return filteredDeveloperProfileIds;
    },
    async isSearchHealthOk() {
      return await meiliClient.isHealthOk();
    },
    async repopulateMeiliSearch() {
      await meiliClient.deleteAllBackgrounds();
      const backgrounds = await repository.getAllBackgrounds();

      await meiliClient.upsertBackground(backgrounds);
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
    async getMeilisearchSettings() {
      return await meiliClient.getSettings();
    },
    async updateMeilisearchSettings(settings: Settings) {
      await meiliClient.updateSettings(settings);
    },
    async resetMeilisearchSettings() {
      await meiliClient.resetSettings();
    },
    async deleteBackgroundById(developerProfileId: string) {
      await repository.deleteBackgroundById(developerProfileId);
    },
  };
}
