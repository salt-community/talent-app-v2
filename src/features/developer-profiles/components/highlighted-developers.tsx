import { Card, CardContent } from "@/components";
import { Background } from "./backgrounds";
import Link from "next/link";

type DeveloperProfiles = {
  developerProfileId: string;
  slug: string;
};

type Props = {
  developerProfiles: DeveloperProfiles[];
};

export async function HighlightedDevelopers({ developerProfiles }: Props) {
  return (
    <>
      <ul className="px-4 pt-10 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:px-8">
        {developerProfiles.map((profiles) => (
          <Link
            href={`/developers/${profiles.slug}`}
            key={profiles.developerProfileId}
          >
            <Card
              key={profiles.developerProfileId}
              className="p-2 h-full flex justify-center min-w-[20rem]"
            >
              <CardContent>
                <Background developerProfileId={profiles.developerProfileId} />
              </CardContent>
            </Card>
          </Link>
        ))}
      </ul>
    </>
  );
}
