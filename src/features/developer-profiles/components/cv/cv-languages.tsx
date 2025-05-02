import { Button } from "@/components";
import { CvPopover } from "./cv-popover";
import { Plus, X } from "lucide-react";
import {
  LanguageInsert,
  SkillInsert,
  SocialLink as SocialLinkType,
} from "../../types";

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

export function CvLanguages({
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
      <h2 className="text-xl font-bold pb-1 text-brand-orange">
        {headerLanguage === "english" ? "Languages" : "Språk"}
      </h2>
      <ul className="w-full">
        {languages.map((language) => (
          <li
            key={language.name}
            className="text-paragraph text-sm flex items-center  "
          >
            <p className="text-white">{language.name}</p>
            {isEditable && (
              <Button
                variant="link"
                size="icon"
                className="h-4 w-4 ml-1 cursor-pointer"
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
            <Button
              variant="outline"
              size="sm"
              className="w-full h-7 mt-2 cursor-pointer"
            >
              <Plus size={24} className="cursor-pointer" /> Add
            </Button>
          </CvPopover>
        )}
      </ul>
    </section>
  );
}
