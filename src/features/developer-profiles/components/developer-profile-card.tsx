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
          {process.env.FF_DEVELOPER_INLINE_EDITABLE_CARD === "ON" ? (
            <InlineBackgroundCard developerProfileId={developerProfileId} />
          ) : (
            <Background developerProfileId={developerProfileId} />
          )}
          </DeveloperProfileLink>
        </CardContent>
      </Card>
  );
}
