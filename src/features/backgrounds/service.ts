import { Repository } from "./repository";
import { BackgroundInsert, BackgroundUpdate } from "./schema";

export function createBackgroundsService(repository: Repository) {
  return {
    async getAll() {
      return repository.getAll();
    },
    async getByUUID(id: string) {
      return repository.getByUUID(id);
    },

    async add(background: BackgroundInsert) {
      await repository.add(background);
    },
    async update(background: BackgroundUpdate) {
      await repository.update(background);
    },
  };
}
