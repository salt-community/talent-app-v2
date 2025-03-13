import { Button } from "@/components";
import {
  LanguageInsert,
  LanguageSelect,
  SkillInsert,
  SkillSelect,
  SocialLink as SocialLinkType,
} from "../../types";
import { SkillsBadges } from "../backgrounds/skills-badges";
import { SocialLink } from "../backgrounds/social-link";
import { Plus } from "lucide-react";
import { CvDialog } from "./cv-dialog";
import { useState } from "react";

type Props = {
  skills: SkillSelect[];
  languages: LanguageSelect[];
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <aside className="px-3 space-y-4 py-8 bg-zinc-100 md:col-start-1 md:col-end-2 z-10">
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Skills</h2>
          {isEditable && (
            <CvDialog
              placeholder={""}
              isOpen={false}
              onAdd={(skill) => {
                onChange([...skills, { name: skill }], languages, links);
              }}
            />
          )}
        </div>
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
