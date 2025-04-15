import { Button } from "@/components";
import { CvPopover } from "./cv-popover";
import { Plus } from "lucide-react";
import {
  LanguageInsert,
  SkillInsert,
  SocialLink as SocialLinkType,
} from "../../types";
import { SkillsBadges } from "../backgrounds/skills-badges";

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

export function CvTechnicalSkills({
  skills,
  languages,
  links,
  avatarUrl,
  isEditable,
  onChange,
  headerLanguage,
}: Props) {
  return (
    <section className="flex flex-col items-start w-full">
      <h2 className="text-xl font-bold text-brand-orange">
        {headerLanguage === "english"
          ? "Technical Skills"
          : "Tekniska färdigheter"}
      </h2>
      <SkillsBadges
        variant="cv"
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
  );
}
