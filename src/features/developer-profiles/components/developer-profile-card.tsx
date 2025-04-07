import { Card, CardContent } from "@/components";
import { DeveloperProfileLink } from "./developer-profile-link";
import { InlineBackgroundCard } from "./backgrounds/inline-background-card";
import { developerProfilesService } from "../instance";

type Props = {
  developerProfileId: string;
};

export async function DeveloperProfileCard({ developerProfileId }: Props) {
  const [developer, developerProfile] = await Promise.all([
    developerProfilesService.getDeveloperById(developerProfileId),
    developerProfilesService.getDeveloperProfileById(developerProfileId),
  ]);

  return (
    <Card className="p-2 h-full justify-center min-w-[10rem] cursor-pointer hover:shadow-lg transition-shadow">
      <CardContent>
        <DeveloperProfileLink developerSlug={developer.slug!}>
          <InlineBackgroundCard developerProfile={developerProfile} />
        </DeveloperProfileLink>
      </CardContent>
    </Card>
  );
}
