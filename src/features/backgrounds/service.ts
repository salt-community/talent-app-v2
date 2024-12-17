import { Repository } from "./repository";
import { BackgroundInsert } from "./db";
import { BackgroundUpdate, ServiceMethods } from "./types";

export function createBackgroundsService(
  repository: Repository,
  serviceMethods: ServiceMethods,
) {
  async function addSkills(backgroundId: number, skills?: string[]) {
    if (skills && skills.length) {
      await repository.addSkills(
        skills.map((name) => ({ backgroundId, name })),
      );
    }
  }
  async function addLanguages(backgroundId: number, languages?: string[]) {
    if (languages && languages.length) {
      await repository.addLanguages(
        languages.map((name) => ({ backgroundId, name })),
      );
    }
  }
  async function addEducations(backgroundId: number, educations?: string[]) {
    if (educations && educations.length) {
      await repository.addEducations(
        educations.map((name) => ({ backgroundId, name })),
      );
    }
  }

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
      await Promise.all([
        addSkills(backgroundId, background.skills),
        addLanguages(backgroundId, background.languages),
        addEducations(backgroundId, background.educations),
      ]);
    },
    async update(background: BackgroundUpdate) {
      await repository.update(background);
      await serviceMethods.syncBackgroundSearchIndex([background]);
    },
  };
}
