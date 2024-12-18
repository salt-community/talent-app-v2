import { Card, CardContent } from "../card";
import { QuoteIcon } from "lucide-react";
import Link from "next/link";
import { BackgroundAvatar } from "@/features/backgrounds/components/avatar";
import { Background } from "@/features/backgrounds/types";

type Props = { background?: Background };
export async function QuoteHighlight({ background }: Props) {
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
          href={`/developers/${background}`}
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