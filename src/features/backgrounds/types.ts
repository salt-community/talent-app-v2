import {
  BackgroundSelect,
  EducationSelect,
  LanguageSelect,
  SkillSelect,
} from "./db";

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
