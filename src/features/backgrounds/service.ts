import { Repository } from "./repository";
import { BackgroundInsert, BackgroundUpdate } from "./schema";
import { iamService } from "../iam/instance";

export function createBackgroundsService(repository: Repository) {
  return {
    async getAll() {
      iamService.hasAccess("backgrounds.getAll", "1");

      return repository.getAll();
    },
    async getById(id: number) {
      return repository.getById(id);
    },

    async add(background: BackgroundInsert) {
      await repository.add(background);
    },
    async update(background: BackgroundUpdate) {
      await repository.update(background);
    },
  };
}
