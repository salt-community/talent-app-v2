import {
  developerProfileBackgrounds,
  developerProfileEducations,
  developerProfileLanguages,
  developerProfiles,
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
export type DeveloperProfileSelect = typeof developerProfiles.$inferSelect;
export type DeveloperProfileInsert = typeof developerProfiles.$inferInsert;
export type TempDeveloperProfileInsert =
  typeof tempDeveloperProfiles.$inferInsert;
// double write type
export type updateTempDeveloperProfile = {
  name?: string;
  email?: string;
  identityId?: string;
  id?: string | undefined;
  slug?: string | null | undefined;
  status?: string | undefined;
};

export type Backgrounds = BackgroundSelect & {
  background_skills: SkillSelect[];
  background_languages: LanguageSelect[];
  background_educations: EducationSelect[];
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

export type BackgroundUpdate = Partial<BackgroundSelect> &
  Required<Pick<BackgroundSelect, "id" | "developerProfileId">> & {
    name: string;
    skills: string[];
    languages: string[];
    educations: string[];
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

export type BackgroundInsert =
  typeof developerProfileBackgrounds.$inferInsert & {
    skills: string[];
    languages: string[];
    educations: string[];
  };

export type BackgroundSelect = typeof developerProfileBackgrounds.$inferSelect;

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
