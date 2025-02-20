import {
  BackgroundSelect,
  EducationSelect,
  LanguageSelect,
  SkillSelect,
  SocialLink,
} from "./db";
import { createBackgroundsService } from "./service";

export type Backgrounds = BackgroundSelect & {
  background_skills: SkillSelect[];
  background_languages: LanguageSelect[];
  background_educations: EducationSelect[];
};

export type Developer = {
  name: string;
  id: string;
  identityId: string | null;
  email: string;
  status: string;
};
export type BackgroundInfo = {
  id: number;
  developerProfileId: string;
  name: string;
  avatarUrl: string;
  title: string;
  bio: string;
  links: SocialLink[];
  skills: SkillSelect[];
  languages: LanguageSelect[];
  educations: EducationSelect[];
};

export type BackgroundUpdate = Partial<BackgroundSelect> &
  Required<Pick<BackgroundSelect, "id" | "developerProfileId">> & {
    name: string;
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

export type typeBackground = {
  id: number;
  developerProfileId: string;
  name: string;
  avatarUrl: string;
  title: string;
  bio: string;
  links: SocialLink[];
};

export type BackgroundsService = ReturnType<typeof createBackgroundsService>;
