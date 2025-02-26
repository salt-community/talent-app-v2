import {
  educations,
  languages,
  meiliSearchOutbox,
} from "./backgrounds-db-schema";
import { backgrounds, developerProfiles, skills } from "./db-schema";
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

export type Backgrounds = BackgroundSelect & {
  background_skills: SkillSelect[];
  background_languages: LanguageSelect[];
  background_educations: EducationSelect[];
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

export type OutboxMessageInsert = typeof meiliSearchOutbox.$inferInsert;
export type OutboxMessageSelect = typeof meiliSearchOutbox.$inferSelect;

export type BackgroundInsert = typeof backgrounds.$inferInsert & {
  skills: string[];
  languages: string[];
  educations: string[];
};

export type BackgroundSelect = typeof backgrounds.$inferSelect;

export type SkillInsert = typeof skills.$inferInsert;
export type SkillSelect = typeof skills.$inferSelect;
export type LanguageInsert = typeof languages.$inferInsert;
export type LanguageSelect = typeof languages.$inferSelect;
export type EducationInsert = typeof educations.$inferInsert;
export type EducationSelect = typeof educations.$inferSelect;

export type SocialLink = {
  url: string;
  name: string;
};
