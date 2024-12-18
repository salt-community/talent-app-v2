import { Repository } from "./repository";
import { BackgroundInsert } from "./db";
import { BackgroundUpdate } from "./types";
import { MeiliClient } from "./meili";

export function createBackgroundsService(
  repository: Repository,
  meiliClient: MeiliClient,
  getHighlightedDevIds: () => Promise<string[]>,
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
      await meiliClient.upsertBackground({ id: backgroundId, ...background });
      await Promise.all([
        await addSkills(backgroundId, background.skills),
        await addLanguages(backgroundId, background.languages),
        await addEducations(backgroundId, background.educations),
      ]);
    },

    async update(background: BackgroundUpdate) {
      await repository.update(background);
      await meiliClient.upsertBackground(background);
      await Promise.all([
        await repository.updateSkills(background.id, background.skills),
        await repository.updateLanguages(background.id, background.languages),
        await repository.updateEducations(background.id, background.educations),
      ]);
    },
    async getAllHighlightedDevIds() {
      return await getHighlightedDevIds();
    },

    async searchDevIds(search: string | undefined) {
      return await meiliClient.searchBackgrounds(search);
    },

    async removeAllBackgrounsFromMeili() {
      await meiliClient.deleteAllBackgrounds();
    },
  };
}
