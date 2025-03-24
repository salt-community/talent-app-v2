import { Experience } from "./components/cv/cv-main-content";
import {
  developerProfileJobs,
  developerProfileLanguages,
  developerProfiles,
  developerProfileSkills,
  searchOutbox,
  newDeveloperProfileEducations,
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
  bio?: string | null;
  links?: SocialLink[];
  skills?: string[];
  educations?: Experience[];
  jobs?: Experience[];
  languages?: string[];
  headline?: string | null;
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
  bio?: string | null;
  links?: SocialLink[];
  skills?: string[];
  educations?: string[];
  languages?: string[];
  headline?: string | null;
};

export type CvInfo = {
  id: string;
  identityId: string;
  name: string;
  avatarUrl: string;
  title: string;
  bio: string | null;
  links: SocialLink[];
  skills: SkillInsert[];
  languages: LanguageInsert[];
  educations: Experience[];
  jobs: Experience[];
  headline: string | null;
  status: string;
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
  bio: string | null;
  links: SocialLink[];
  headline: string | null;
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
export type DeveloperProfileUpdate = Partial<DeveloperProfileInsert> & {
  id: string;
};
export type OutboxMessageInsert = typeof searchOutbox.$inferInsert;
export type OutboxMessageSelect = typeof searchOutbox.$inferSelect;

export type SkillInsert = typeof developerProfileSkills.$inferInsert;
export type SkillSelect = typeof developerProfileSkills.$inferSelect;
export type SkillUpdate = Partial<SkillInsert> & { name: string };

export type LanguageInsert = typeof developerProfileLanguages.$inferInsert;
export type LanguageSelect = typeof developerProfileLanguages.$inferSelect;
export type LanguageUpdate = Partial<LanguageInsert> & { name: string };

export type EducationInsert = typeof newDeveloperProfileEducations.$inferInsert;
export type EducationSelect = typeof newDeveloperProfileEducations.$inferSelect;
export type EducationUpdate = EducationInsert;

export type JobsInsert = typeof developerProfileJobs.$inferInsert;
export type JobsSelect = typeof developerProfileJobs.$inferSelect;
export type JobsUpdate = JobsInsert;

export type DeveloperProfileDetailsUpdate = DeveloperProfileUpdate & {
  skills?: SkillUpdate[];
  languages?: LanguageUpdate[];
  educations?: EducationUpdate[];
  jobs?: JobsInsert[];
};
