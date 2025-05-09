import { Card, CardContent } from "@/components";
import { Background } from "./backgrounds";
import Link from "next/link";
import { developerProfilesService } from "../instance";
import { BlurFade } from "@/components/magicui/blur-fade";

type DeveloperProfiles = {
  id: string;
  slug: string | null;
};

export async function HighlightedDevelopers() {
  const highlightedDeveloperProfiles =
    await developerProfilesService.getHighlightedDeveloperProfiles();

  return (
    <>
    <BlurFade delay={0.25} inView>
      <ul className="px-4 pt-10 mb-6 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:px-8">
        {highlightedDeveloperProfiles.map((profiles: DeveloperProfiles) => (
          <Link href={`/developers/${profiles.slug}`} key={profiles.id}>
            <Card
              key={profiles.id}
              className="p-2 h-full flex justify-center min-w-[20rem]"
            >
              <CardContent>
                <Background developerProfileId={profiles.id} />
              </CardContent>
            </Card>
          </Link>
        ))}
      </ul>
      </BlurFade>
    </>
  );
}
