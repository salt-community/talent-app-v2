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
};

export function CvAside({
  skills,
  languages,
  links,
  avatarUrl,
  isEditable,
  onChange,
}: Props) {

  return (
    <aside className="md:col-start-1 md:col-end-2 px-4 h-full items-center bg-zinc-100 relative flex flex-col gap-6 py-2">
      <section className="h-fit bg-zin-100 relative">
        <BackgroundAvatar url={avatarUrl} size="lg" />
        {isEditable && (
          <CvPopover
            placeholder={"Set your avatar URL"}
            icon={Check}
            onAdd={(avatarUrl) => {
              onChange({ avatarUrl, skills, languages, links });
            }}
          >
            <Button className="absolute bottom-4 right-4 z-20 rounded-full p-0 h-8 w-8">
              <Camera />
            </Button>
          </CvPopover>
        )}
      </section>
      <section className="flex flex-col items-start w-full">
        <h2 className="text-xl font-bold">Technical Skills</h2>
        <SkillsBadges
          variant="secondary"
          skills={skills}
          isEditable={isEditable}
          onDelete={(skill) => {
            onChange({
              skills: skills.filter((s) => s.name !== skill.name),
              languages,
              links,
              avatarUrl,
            });
          }}
        />
        {isEditable && (
          <CvPopover
            placeholder={"Write your skill"}
            icon={Plus}
            onAdd={(skill) => {
              onChange({
                skills: [...skills, { name: skill }],
                languages,
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
      </section>
      <section className="flex flex-col items-start w-full">
        <h2 className="text-xl font-bold pb-1">Languages</h2>
        <ul className="w-full">
          {languages.map((language) => (
            <li
              key={language.name}
              className="text-paragraph text-sm flex items-center"
            >
              {language.name}{" "}
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
                  <X />
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
        <h2 className="text-xl font-bold">Social</h2>
        <ul className="w-full">
          {links.map((link) => (
            <li key={link.name} className="h-full flex justify-start">
              <SocialLink name={link.name} url={link.url} />
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
                  <X />
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
