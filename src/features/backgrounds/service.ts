import { Repository } from "./repository";
import { BackgroundInsert, BackgroundUpdate } from "./schema";
import { iamService } from "../iam/instance";

export function createBackgroundsService(repository: Repository) {
  return {
    async getAll() {
      iamService.checkAccess("backgrounds.getAll", "1");

      return repository.getAll();
    },
    async getByDevId(devId: string) {
      return repository.getByDevId(devId);
    },

    async add(background: BackgroundInsert) {
      await repository.add(background);
    },
    async update(background: BackgroundUpdate) {
      await repository.update(background);
    },
  };
}
