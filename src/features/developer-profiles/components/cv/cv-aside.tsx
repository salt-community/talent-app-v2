import { Button } from "@/components";
import {
  LanguageInsert,
  SkillInsert,
  SocialLink as SocialLinkType,
} from "../../types";
import { SkillsBadges } from "../backgrounds/skills-badges";
import { SocialLink } from "../backgrounds/social-link";
import { CvPopover } from "./cv-popover";
import { Plus, X } from "lucide-react";

type Props = {
  skills: SkillInsert[];
  languages: LanguageInsert[];
  links: SocialLinkType[];
  onChange: (data: {
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
  isEditable,
  onChange,
}: Props) {

  return (
    <aside className="px-3 space-y-4 py-8 bg-zinc-100 md:col-start-1 md:col-end-2 z-10">
      <section className="flex flex-col">
        <h2 className="text-xl font-bold">Skills</h2>
        <SkillsBadges
          skills={skills}
          isEditable={isEditable}
          onDelete={(skill) => {
            onChange({
              skills: skills.filter((s) => s.name !== skill.name),
              languages,
              links,
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
              });
            }}
          >
            <Button variant="outline" size="sm" className="w-full h-7 mt-2">
              <Plus size={24} className="cursor-pointer" /> Add
            </Button>
          </CvPopover>
        )}
      </section>
      <section>
        <h2 className="text-xl font-bold pb-1">Languages</h2>
        <ul>
          {languages.map((language) => (
            <li
              key={language.name}
              className="text-paragraph flex items-center"
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
      <section>
        <h2 className="text-xl font-bold">Social</h2>
        <ul>
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
                  });
                }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full h-7 mt-2"
                  disabled={links.some((link) => link.name === "Resume")}>
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
