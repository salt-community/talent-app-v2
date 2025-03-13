import {
  developerProfileEducations,
  developerProfileLanguages,
  developerProfiles,
  developerProfileSkills,
  meiliSearchOutbox,
} from "./db-schema";
import { createDeveloperProfilesService } from "./service";
import { JwtPayload } from "jsonwebtoken";

export type DevelopersService = ReturnType<
  typeof createDeveloperProfilesService
>;
export interface SessionClaims extends JwtPayload {
  first_name?: string;
  last_name?: string;
  email?: string | undefined;
}

export type updateDeveloperProfile = {
  id: string;
  name?: string;
  email?: string;
  identityId?: string;
  slug?: string | null | undefined;
  status?: string | undefined;
  avatarUrl?: string;
  title?: string;
  bio?: string;
  links?: SocialLink[];
  skills?: string[];
  educations?: string[];
  languages?: string[];
};

export type AddDeveloperProfile = {
  id?: string;
  name: string;
  email: string;
  identityId: string;
  slug: string | null | undefined;
  status?: string | undefined;
  avatarUrl?: string;
  title?: string;
  bio?: string;
  links?: SocialLink[];
  skills?: string[];
  educations?: string[];
  languages?: string[];
};

export type BackgroundInfo = {
  id: string;
  identityId: string;
  name: string;
  avatarUrl: string;
  title: string;
  bio: string;
  links: SocialLink[];
  skills: SkillSelect[];
  languages: LanguageSelect[];
  educations: EducationSelect[];
};

export type CvInfo = {
  id: string;
  identityId: string;
  name: string;
  avatarUrl: string;
  title: string;
  bio: string;
  links: SocialLink[];
  skills: SkillInsert[];
  languages: LanguageInsert[];
  educations: EducationSelect[];
};

export type developerProfileUpdate = Partial<DeveloperProfileInsert> &
  Required<Pick<DeveloperProfileInsert, "id" | "identityId">> & {
    name: string;
    skills: string[];
    languages: string[];
    educations: string[];
    status: string;
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

export type DeveloperProfile = {
  id: string;
  identityId: string;
  name: string;
  avatarUrl: string;
  title: string;
  bio: string;
  links: SocialLink[];
};

export type developerProfileDetails = {
  id: string;
  skills: string[];
  languages: string[];
  educations: string[];
  links?: SocialLink[];
};

export type SocialLink = {
  url: string;
  name: string;
};

export type DeveloperProfileInsert = typeof developerProfiles.$inferInsert;
export type OutboxMessageInsert = typeof meiliSearchOutbox.$inferInsert;
export type OutboxMessageSelect = typeof meiliSearchOutbox.$inferSelect;

export type SkillInsert = typeof developerProfileSkills.$inferInsert;
export type SkillSelect = typeof developerProfileSkills.$inferSelect;
export type LanguageInsert = typeof developerProfileLanguages.$inferInsert;
export type LanguageSelect = typeof developerProfileLanguages.$inferSelect;
export type EducationInsert = typeof developerProfileEducations.$inferInsert;
export type EducationSelect = typeof developerProfileEducations.$inferSelect;
