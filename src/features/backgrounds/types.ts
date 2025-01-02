import {
  BackgroundSelect,
  EducationSelect,
  LanguageSelect,
  SkillSelect,
} from "./db";
import { createBackgroundsService } from "./service";

export type Background = BackgroundSelect & {
  skills: SkillSelect[];
  languages: LanguageSelect[];
  educations: EducationSelect[];
};

export type BackgroundUpdate = Partial<BackgroundSelect> &
  Required<Pick<BackgroundSelect, "id" | "devId">> & {
    skills: string[];
    languages: string[];
    educations: string[];
  };

  export type BackgroundService = ReturnType<typeof createBackgroundsService>;
  export type RepopulateMeiliSearch = BackgroundService["repopulateMeiliSearch"];