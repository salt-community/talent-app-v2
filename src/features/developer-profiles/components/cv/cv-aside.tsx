import { Button } from "@/components";
import {
  LanguageInsert,
  SkillInsert,
  SocialLink as SocialLinkType,
} from "../../types";
import { SkillsBadges } from "../backgrounds/skills-badges";
import { SocialLink } from "../backgrounds/social-link";
import { CvPopover } from "./cv-popover";
import { Camera, Check, Plus, X } from "lucide-react";
import { BackgroundAvatar } from "../backgrounds/avatar";
import { CvAvatar } from "./cv-avatar";
import { CvTechnicalSkills } from "./cv-technical-skills";

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
      <section className="flex flex-col items-start w-full">
        <h2 className="text-xl font-bold pb-1 text-brand-orange">
          {headerLanguage === "english" ? "Languages" : "Språk"}
        </h2>
        <ul className="w-full">
          {languages.map((language) => (
            <li
              key={language.name}
              className="text-paragraph text-sm flex items-center text-white"
            >
              {language.name}
              {isEditable && (
                <Button
                  variant="link"
                  size="icon"
                  className="h-4 w-4 ml-1"
                  onClick={() =>
                    onChange({
                      skills,
                      languages: languages.filter(
                        (l) => l.name !== language.name
                      ),
                      links,
                      avatarUrl,
                    })
                  }
                >
                  <X className="text-white" />
                </Button>
              )}
            </li>
          ))}
          {isEditable && (
            <CvPopover
              placeholder={"Write your language"}
              icon={Plus}
              onAdd={(language) => {
                onChange({
                  skills,
                  languages: [...languages, { name: language }],
                  links,
                  avatarUrl,
                });
              }}
            >
              <Button variant="outline" size="sm" className="w-full h-7 mt-2">
                <Plus size={24} className="cursor-pointer" /> Add
              </Button>
            </CvPopover>
          )}
        </ul>
      </section>
      <section className="w-full">
        <h2 className="text-xl font-bold text-brand-orange">
          {headerLanguage === "english" ? "Social" : "Social"}
        </h2>
        <ul className="w-full">
          {links.map((link) => (
            <li key={link.name} className="h-full flex justify-start">
              <SocialLink name={link.name} url={link.url} variant="cv" />
              {isEditable && (
                <Button
                  variant="link"
                  size="icon"
                  className="h-4 w-4 ml-1"
                  onClick={() =>
                    onChange({
                      skills,
                      languages,
                      links: links.filter((l) => l.name !== link.name),
                      avatarUrl,
                    })
                  }
                >
                  <X className="text-white" />
                </Button>
              )}
            </li>
          ))}
          {isEditable && (
            <>
              <CvPopover
                placeholder={"Write your Github link"}
                icon={Plus}
                onAdd={(social) => {
                  onChange({
                    skills,
                    languages,
                    links: [...links, { name: "Github", url: social }],
                    avatarUrl,
                  });
                }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full h-7 mt-2"
                  disabled={links.some((link) => link.name === "Github")}
                >
                  <Plus size={24} className="cursor-pointer" /> Add Github
                </Button>
              </CvPopover>
              <CvPopover
                placeholder={"Write your Portfolio link"}
                icon={Plus}
                onAdd={(social) => {
                  onChange({
                    skills,
                    languages,
                    links: [...links, { name: "Resume", url: social }],
                    avatarUrl,
                  });
                }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full h-7 mt-2"
                  disabled={links.some((link) => link.name === "Resume")}
                >
                  <Plus size={24} className="cursor-pointer" /> Add Portfolio
                </Button>
              </CvPopover>
            </>
          )}
        </ul>
      </section>
    </aside>
  );
}
