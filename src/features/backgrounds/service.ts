import { Repository } from "./repository";
import { BackgroundInsert } from "./db";
import { BackgroundUpdate, ServiceMethods } from "./types";

export function createBackgroundsService(
  repository: Repository,
  serviceMethods: ServiceMethods,
) {
  return {
    async getAllBackgrounds() {
      return await repository.getAllBackgrounds();
    },
    async getBackgroundByDevId(devId: string) {
      return await repository.getBackgrounByDevId(devId);
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
    async add(background: BackgroundInsert) {
      const backgroundId = await repository.add(background);
      await serviceMethods.syncBackgroundSearchIndex([background]);
      if (background.skills.length) {
        await repository.addSkills(
          background.skills.map((name) => ({ backgroundId, name })),
        );
      }
      if (background.languages.length) {
        await repository.addLanguages(
          background.languages.map((name) => ({ backgroundId, name })),
        );
      }
      if (background.educations.length) {
        await repository.addEducations(
          background.educations.map((name) => ({ backgroundId, name })),
        );
      }
    },
    async update(background: BackgroundUpdate) {
      await repository.update(background);
      await serviceMethods.syncBackgroundSearchIndex([background]);
    },
  };
}
