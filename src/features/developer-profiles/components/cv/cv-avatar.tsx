import { Button } from "@/components";
import { BackgroundAvatar } from "../backgrounds/avatar";
import { CvPopover } from "./cv-popover";
import { Camera, Check } from "lucide-react";
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
};

export function CvAvatar({
  skills,
  languages,
  links,
  avatarUrl,
  isEditable,
  onChange,
}: Props) {
  return (
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
  );
}
