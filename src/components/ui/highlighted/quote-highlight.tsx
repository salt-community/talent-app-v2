import { Card, CardContent } from "../card";
import { QuoteIcon } from "lucide-react";
import { BackgroundAvatar } from "@/features/backgrounds/components/avatar";
import { Backgrounds } from "@/features/backgrounds/types";

type Props = { background?: Backgrounds };
export function QuoteHighlight({ background }: Props) {
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
        <div className="gap-2 flex justify-end w-full items-center">
          <div className="flex flex-col gap-0">
            <p className="text-xl font-semibold ">{background.name}</p>
            <p className="text-lg leading-none">{background.title}</p>
          </div>
          <BackgroundAvatar size="sm" url={background.avatarUrl} />
        </div>
      </CardContent>
    </Card>
  );
}
