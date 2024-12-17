import { Repository } from "./repository";
import { BackgroundInsert, BackgroundUpdate } from "./schema";
import { ServiceMethods } from "./types";

export function createBackgroundsService(
  repository: Repository,
  serviceMethods: ServiceMethods
) {
  return {
    async getAll() {
      return repository.getAll();
    },
    async getByDevId(devId: string) {
      return repository.getByDevId(devId);
    },

    async add(background: BackgroundInsert) {
      await repository.add(background);
      await serviceMethods.syncBackgroundSearchIndex([background]);
    },
    async update(background: BackgroundUpdate) {
      await repository.update(background);
      await serviceMethods.syncBackgroundSearchIndex([background]);
    },
  };
}
