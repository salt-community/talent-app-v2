import {
  LanguageSelect,
  SkillSelect,
  SocialLink as SocialLinkType,
} from "../../types";
import { Row } from "../backgrounds/row";
import { SkillsBadges } from "../backgrounds/skills-badges";
import { SocialLink } from "../backgrounds/social-link";

type Props = {
  skills: SkillSelect[];
  languages: LanguageSelect[];
  links: SocialLinkType[];
};

export function CvAside({ skills, languages, links }: Props) {
  const filteredLinks = links.filter((e) => e.name !== "Resume");

  return (
    <aside className="px-3 space-y-4 py-8 bg-zinc-100 md:col-start-1 md:col-end-2">
      <section>
        <h2 className="text-xl font-bold">Skills</h2>
        <SkillsBadges skills={skills} />
      </section>
      <section>
        <h2 className="text-xl font-bold pb-1">Languages</h2>
        <ul>
          {languages.map((language) => (
            <li key={language.id} className="text-paragraph">
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
