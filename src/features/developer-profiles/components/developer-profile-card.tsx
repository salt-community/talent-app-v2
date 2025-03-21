import { Card, CardContent } from "@/components";
import { DeveloperProfileLink } from "./developer-profile-link";
import { Background } from "./backgrounds";
import { InlineBackgroundCard } from "./backgrounds/inline-background-card";

type Props = {
  developerProfileId: string;
};

export async function DeveloperProfileCard({ developerProfileId }: Props) {
  return (
    <Card className="p-2 h-full justify-center min-w-[10rem] cursor-pointer hover:shadow-lg transition-shadow">
      <CardContent>
        <DeveloperProfileLink developerProfileId={developerProfileId}>
          <InlineBackgroundCard developerProfileId={developerProfileId} />
        </DeveloperProfileLink>
      </CardContent>
    </Card>
  );
}
