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
  const getProxiedImageUrl = (url: string) => {
    if (!url) return "";

    if (url.startsWith("http") || url.startsWith("https")) {
      if (url.includes("/api/proxy-image?url=")) {
        return url;
      }
      return `/api/proxy-image?url=${encodeURIComponent(url)}`;
    }

    return url;
  };
  const handleAddUrl = (url: string) => {
    if (url.startsWith("http") || url.startsWith("https")) {
      onChange({ avatarUrl: url, skills, languages, links });
    } else {
      onChange({ avatarUrl: url, skills, languages, links });
    }
  };

  const optimizedAvatarUrl = getProxiedImageUrl(avatarUrl);

  return (
    <section className="h-fit bg-zin-100 relative">
      <BackgroundAvatar url={optimizedAvatarUrl} size="lg" />
      {isEditable && (
        <CvPopover
          placeholder={"Set your avatar URL"}
          icon={Check}
          onAdd={handleAddUrl}
        >
          <Button className="absolute bottom-4 right-4 z-20 rounded-full p-0 h-8 w-8">
            <Camera />
          </Button>
        </CvPopover>
      )}
    </section>
  );
}
