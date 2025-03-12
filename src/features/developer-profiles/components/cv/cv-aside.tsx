import { Button } from "@/components";
import {
  LanguageSelect,
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
  isEditable: boolean;
};

export function CvAside({ skills, languages, links, isEditable }: Props) {
  const filteredLinks = links.filter((e) => e.name !== "Resume");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <aside className="px-3 space-y-4 py-8 bg-zinc-100 md:col-start-1 md:col-end-2 z-10">
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Skills</h2>
          {isEditable && (
            <Button
              variant="link"
              size="icon"
              onClick={() => setIsDialogOpen(!isDialogOpen)}
            >
              <Plus size={24} className="cursor-pointer" />
            </Button>
          )}
        </div>
        <SkillsBadges skills={skills} />
        {isDialogOpen && (
          <CvDialog
            hiddenTitle="Add Skill"
            placeholder="Search for skills..."
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
          />
        )}
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
