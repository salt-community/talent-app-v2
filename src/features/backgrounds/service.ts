import { Repository } from "./repository";
import { BackgroundInsert } from "./db";
import { BackgroundUpdate, ServiceMethods } from "./types";

export function createBackgroundsService(
  repository: Repository,
  serviceMethods: ServiceMethods,
) {
  return {
    async getAll() {
      return await repository.getAll();
    },
    async getByDevId(devId: string) {
      return await repository.getByDevId(devId);
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
