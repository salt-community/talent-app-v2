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

export type BackgroundUpdate = Partial<Background> &
  Required<Pick<BackgroundSelect, "id">>;

export type ServiceMethods = {
  syncBackgroundSearchIndex: (
    background: Record<string, unknown>[],
  ) => Promise<unknown>;
};
