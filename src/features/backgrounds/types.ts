import {
  BackgroundSelect,
  EducationSelect,
  LanguageSelect,
  SkillSelect,
} from "./db";
import { createBackgroundsService } from "./service";

export type Backgrounds = BackgroundSelect & {
  background_skills: SkillSelect[];
  background_languages: LanguageSelect[];
  background_educations: EducationSelect[];
};

export type BackgroundUpdate = Partial<BackgroundSelect> &
  Required<Pick<BackgroundSelect, "id" | "devId">> & {
    skills: string[];
    languages: string[];
    educations: string[];
  };

export type PreviousState =
  | {
      errorMessages: {
        avatarUrlError?: string;
        nameError?: string;
        titleError?: string;
      };
      update: {
        [k: string]: FormDataEntryValue;
      };
    }
  | undefined;

export type BackgroundsService = ReturnType<typeof createBackgroundsService>;
