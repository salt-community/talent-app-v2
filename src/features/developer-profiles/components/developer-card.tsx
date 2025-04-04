import { Card, CardContent } from "@/components";
import { DeveloperProfileLink } from "./developer-profile-link";
import { Background } from "./backgrounds";
import { CvInfo } from "../types";

type Props = { developerProfile: CvInfo };

export async function DeveloperCard({ developerProfile }: Props) {
  return (
    <Card className="p-2 h-full justify-center min-w-[20rem] cursor-pointer hover:shadow-lg transition-shadow">
      <CardContent>
        <DeveloperProfileLink developerSlug={developerProfile.slug!}>
          <Background developerProfile={developerProfile} />
        </DeveloperProfileLink>
      </CardContent>
    </Card>
  );
}
