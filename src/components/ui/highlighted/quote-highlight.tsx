import { Card, CardContent } from "../card";
import { QuoteIcon } from "lucide-react";
import Link from "next/link";
/* import { backgroundsService } from "@/features"; */
import { BackgroundAvatar } from "@/features/backgrounds/components/avatar";
import { Background } from "@/features/backgrounds/types";

type Props = { background: Background };


type Props = { devId?: string };
export async function QuoteHighlight({ devId }: Props) {
  const background = devId
    ? await backgroundsService.getBackgroundByDevId(devId)
    : {
        name: "John Doe",
        title: "Full-stack Developer",
        avatarUrl: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
        bio: "I am a full-stack JavaScript developer with a passion for building scalable web applications.",
        links: [
          { name: "Github", url: "https://github.com" },
          { name: "LinkedIn", url: "https://linkedin.com" },
          { name: "Resume", url: "https://resume.com" },
        ],
        devId: "1",
        educations: [],
        languages: [],
        skills: [],
        id: 1,
      };
  if (!background) {
    return null;
  }
  return (
    <Card className="m-2 max-w-sm text-right rounded-2xl bg-neutral/10 px-4">
      <CardContent className="flex flex-col gap-6">
        <QuoteIcon
          size={60}
          className="text-white fill-white"
          strokeWidth={1}
        />
        <blockquote className="text-2xl font-light">
          {
            "I am a full-stack JavaScript developer with a passion for building scalable web applications."
          }
        </blockquote>
        <Link
          className="gap-2 flex justify-end w-full items-center"
          href={`/developers/${background.avatarUrl}`}
        >
          <div className="flex flex-col gap-0">
            <p className="text-xl font-semibold ">{background.name}</p>
            <p className="text-lg leading-none">{background.title}</p>
          </div>
          <BackgroundAvatar size="sm" url={background.avatarUrl} />
        </Link>
      </CardContent>
    </Card>
  );
}