import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { BackgroundAvatar } from "./avatar";
import { H2 } from "@/components";

type Props = {
  highlightedBackground: {
    imageUrl: string;
    title: string;
    excerpt: string;
    avatarUrl: string;
    name: string;
    date: string;
  };
};

export function InterviewCard({
  highlightedBackground
}: Props) {
  return (
    <Card key={highlightedBackground.name} className="max-w-sm flex flex-col">
        <Image
          src={highlightedBackground.imageUrl}
          alt={highlightedBackground.title}
          width={600}
          height={600}
          className="object-cover [object-position:top] h-80 w-full"
        />
      <CardContent className="p-4 flex flex-col justify-between gap-3 h-full">
        <H2>{highlightedBackground.title}</H2>
        <p className="text-paragraphLight">{highlightedBackground.excerpt}</p>

        <section className="flex gap-4 justify-between items-center mt-4">
          <div className="flex gap-4 items-center ">
            <BackgroundAvatar url={highlightedBackground.avatarUrl} size="sm" />
            <div>
              <p className="font-semibold">{highlightedBackground.name}</p>
              <p className="flex items-center gap-1 text-paragraphLight">
                <CalendarIcon className="h-3 w-3" />
                {highlightedBackground.date}
              </p>
            </div>
          </div>
          <Button asChild variant={'secondary'}>
            <Link href={`/`}>Read More</Link>
          </Button>
        </section>
      </CardContent>
    </Card>
  );
}
