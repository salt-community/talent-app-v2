import { Repository } from "./repository";
import { BackgroundInsert, BackgroundUpdate } from "./schema";
import { iamService } from "../iam/instance";

export function createBackgroundsService(repository: Repository) {
  return {
    async getAll() {
      iamService.hasAccess(
        "backgrounds.getAll",
        "d5669713-9658-4463-91a4-09be6422bb8e"
      );

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
