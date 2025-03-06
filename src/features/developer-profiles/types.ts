import {
  developerProfileEducations,
  developerProfileLanguages,
  developerProfileSkills,
  meiliSearchOutbox,
  tempDeveloperProfiles,
} from "./db-schema";
import { createDeveloperProfilesService } from "./service";
import { JwtPayload } from "jsonwebtoken";

export type DevelopersService = ReturnType<
  typeof createDeveloperProfilesService
>;

export type GetAllDeveloperProfiles = DevelopersService["getAll"];
export type DeleteDeveloperProfile = DevelopersService["delete"];
export type UpdateStatus = DevelopersService["updateStatus"];
export type GetAllById = DevelopersService["getAllById"];
export type CreateDeveloperProfile =
  DevelopersService["createDeveloperProfile"];
export type GetDeveloperProfileByIdentityId =
  DevelopersService["getDeveloperProfileByIdentityId"];

export type Developer = {
  name: string;
  id: string;
  identityId: string | null;
  email: string;
  status: string;
};

export interface SessionClaims extends JwtPayload {
  first_name?: string;
  last_name?: string;
  email?: string | undefined;
}
export type TempDeveloperProfileInsert =
  typeof tempDeveloperProfiles.$inferInsert;
// double write type
export type updateTempDeveloperProfile = {
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

export type developerProfileUpdate = Partial<TempDeveloperProfileInsert> &
  Required<Pick<TempDeveloperProfileInsert, "id" | "identityId">> & {
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

export type typeBackground = {
  id: number;
  developerProfileId: string;
  name: string;
  avatarUrl: string;
  title: string;
  bio: string;
  links: SocialLink[];
};
export type typeDeveloperProfile = {
  id: string;
  identityId: string;
  name: string;
  avatarUrl: string;
  title: string;
  bio: string;
  links: SocialLink[];
};

export type BackgroundForDeveloperProfile = {
  developerProfileId: string;
  avatarUrl?: string;
  title?: string;
  bio?: string;
  links?: SocialLink[];
};

export type OutboxMessageInsert = typeof meiliSearchOutbox.$inferInsert;
export type OutboxMessageSelect = typeof meiliSearchOutbox.$inferSelect;

export type developerProfileDetails = {
  developerProfileId: string;
  skills: string[];
  languages: string[];
  educations: string[];
  links?: SocialLink[];
};

export type SkillInsert = typeof developerProfileSkills.$inferInsert;
export type SkillSelect = typeof developerProfileSkills.$inferSelect;
export type LanguageInsert = typeof developerProfileLanguages.$inferInsert;
export type LanguageSelect = typeof developerProfileLanguages.$inferSelect;
export type EducationInsert = typeof developerProfileEducations.$inferInsert;
export type EducationSelect = typeof developerProfileEducations.$inferSelect;

export type SocialLink = {
  url: string;
  name: string;
};
