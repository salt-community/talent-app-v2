import { Button } from "@/components";
import {
  LanguageInsert,
  SkillInsert,
  SocialLink as SocialLinkType,
} from "../../types";
import { SocialLink } from "../backgrounds/social-link";
import { CvPopover } from "./cv-popover";
import { Camera, Check, Plus, X } from "lucide-react";
import { BackgroundAvatar } from "../backgrounds/avatar";
import { CvAvatar } from "./cv-avatar";
import { CvTechnicalSkills } from "./cv-technical-skills";
import { CvLanguages } from "./cv-languages";
import { CvSocialLink } from "./cv-social-link";

type Props = {
  skills: SkillInsert[];
  languages: LanguageInsert[];
  links: SocialLinkType[];
  avatarUrl: string;
  onChange: (data: {
    avatarUrl: string;
    skills: SkillInsert[];
    languages: LanguageInsert[];
    links: SocialLinkType[];
  }) => void;
  isEditable: boolean;
  headerLanguage: string;
};

export function CvAside({
  skills,
  languages,
  links,
  avatarUrl,
  isEditable,
  onChange,
  headerLanguage,
}: Props) {
  return (
    <aside className="md:col-start-1 md:col-end-2 px-4 h-full items-center bg-cv-darkgray relative flex flex-col gap-6 py-2">
      <CvAvatar
        skills={skills}
        languages={languages}
        links={links}
        avatarUrl={avatarUrl}
        onChange={onChange}
        isEditable={isEditable}
      />
      <CvTechnicalSkills
        skills={skills}
        languages={languages}
        links={links}
        avatarUrl={avatarUrl}
        onChange={onChange}
        isEditable={isEditable}
        headerLanguage={headerLanguage}
      />
      <CvLanguages
        skills={skills}
        languages={languages}
        links={links}
        avatarUrl={avatarUrl}
        onChange={onChange}
        isEditable={isEditable}
        headerLanguage={headerLanguage}
      />
      <CvSocialLink
        skills={skills}
        languages={languages}
        links={links}
        avatarUrl={avatarUrl}
        onChange={onChange}
        isEditable={isEditable}
        headerLanguage={headerLanguage}
      />
    </aside>
  );
}
