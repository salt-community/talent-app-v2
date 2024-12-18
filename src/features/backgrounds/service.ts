import { Repository } from "./repository";
import { BackgroundInsert } from "./db";
import { BackgroundUpdate, ServiceMethods } from "./types";
import { CheckAccess } from "@/features";

export function createBackgroundsService(
  repository: Repository,
  serviceMethods: ServiceMethods,
  checkAccess: CheckAccess
) {
  async function addSkills(backgroundId: number, skills?: string[]) {
    if (skills && skills.length) {
      checkAccess("backgrounds.updateSkills");
      await repository.addSkills(
        skills.map((name) => ({ backgroundId, name }))
      );
    }
  }
  async function addLanguages(backgroundId: number, languages?: string[]) {
    if (languages && languages.length) {
      checkAccess("backgrounds.updateLanguages");

      await repository.addLanguages(
        languages.map((name) => ({ backgroundId, name }))
      );
    }
  }
  async function addEducations(backgroundId: number, educations?: string[]) {
    if (educations && educations.length) {
      checkAccess("backgrounds.updateEducation");

      await repository.addEducations(
        educations.map((name) => ({ backgroundId, name }))
      );
    }
  }

  return {
    async getAllBackgrounds() {
      checkAccess("backgrounds.getAll");
      return await repository.getAllBackgrounds();
    },
    async getBackgroundByDevId(devId: string) {
      checkAccess("backgrounds.getById");
      return await repository.getBackgrounByDevId(devId);
    },
    async getAllSkills() {
      checkAccess("backgrounds.getSkillsById");

      return (await repository.getAllSkills()).filter(
        (skill, index, array) =>
          array.findIndex((s) => s.name === skill.name) === index
      );
    },
    async getAllLanguages() {
      checkAccess("backgrounds.getLanguagesById");

      return (await repository.getAllLanguages()).filter(
        (language, index, array) =>
          array.findIndex((l) => l.name === language.name) === index
      );
    },
    async getAllEducations() {
      checkAccess("backgrounds.getEducationById");

      return (await repository.getAllEducations()).filter(
        (education, index, array) =>
          array.findIndex((e) => e.name === education.name) === index
      );
    },
    async add(background: BackgroundInsert) {
      checkAccess("backgrounds.add");
      const backgroundId = await repository.add(background);
      await serviceMethods.syncBackgroundSearchIndex([background]);
      await Promise.all([
        await addSkills(backgroundId, background.skills),
        await addLanguages(backgroundId, background.languages),
        await addEducations(backgroundId, background.educations),
      ]);
    },

    async update(background: BackgroundUpdate) {
      checkAccess("backgrounds.update");
      await repository.update(background);
      await serviceMethods.syncBackgroundSearchIndex([background]);
      await Promise.all([
        await repository.updateSkills(background.id, background.skills),
        await repository.updateLanguages(background.id, background.languages),
        await repository.updateEducations(background.id, background.educations),
      ]);
    },
  };
}
