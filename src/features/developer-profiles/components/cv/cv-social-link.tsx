import { Button } from "@/components";
import { CvPopover } from "./cv-popover";
import { Plus, X } from "lucide-react";
import {
  LanguageInsert,
  SkillInsert,
  SocialLink as SocialLinkType,
} from "../../types";
import { SocialLink } from "../backgrounds/social-link";

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

export function CvSocialLink({
  skills,
  languages,
  links,
  avatarUrl,
  isEditable,
  onChange,
  headerLanguage,
}: Props) {
  return (
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
                className="w-full h-7 mt-2 cursor-pointer"
                disabled={links.some((link) => link.name === "Resume")}
              >
                <Plus size={24} className="cursor-pointer" /> Add Portfolio
              </Button>
            </CvPopover>
          </>
        )}
      </ul>
    </section>
  );
}
