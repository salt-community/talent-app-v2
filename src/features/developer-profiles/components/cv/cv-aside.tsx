import {
  LanguageInsert,
  SkillInsert,
  SocialLink as SocialLinkType,
} from "../../types";
import { SkillsBadges } from "../backgrounds/skills-badges";
import { SocialLink } from "../backgrounds/social-link";
import { CvPopover } from "./cv-popover";

type Props = {
  skills: SkillInsert[];
  languages: LanguageInsert[];
  links: SocialLinkType[];
  onChange: (
    skills: SkillInsert[],
    languages: LanguageInsert[],
    links: SocialLinkType[],
  ) => void;
  isEditable: boolean;
};

export function CvAside({
  skills,
  languages,
  links,
  isEditable,
  onChange,
}: Props) {
  const filteredLinks = links.filter((e) => e.name !== "Resume");

  return (
    <aside className="px-3 space-y-4 py-8 bg-zinc-100 md:col-start-1 md:col-end-2 z-10">
      <section className="flex flex-col">
        <h2 className="text-xl font-bold">Skills</h2>
        <SkillsBadges
          skills={skills}
          isEditable={isEditable}
          onDelete={(skill) => {
            onChange(
              skills.filter((s) => s.name !== skill.name),
              languages,
              links,
            );
          }}
        />
        {isEditable && (
          <CvPopover
            placeholder={"Write your skill"}
            onAdd={(skill) => {
              onChange([...skills, { name: skill }], languages, links);
            }}
          />
        )}
      </section>
      <section>
        <h2 className="text-xl font-bold pb-1">Languages</h2>
        <ul>
          {languages.map((language) => (
            <li key={language.name} className="text-paragraph">
              {language.name}
            </li>
          ))}
        </ul>
      </section>
      {filteredLinks.length > 0 && (
        <section>
          <h2 className="text-xl font-bold">Social</h2>
          <ul>
            {filteredLinks.map((link) => (
              <li key={link.name} className="h-full flex justify-start">
                <SocialLink name={link.name} url={link.url} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </aside>
  );
}
