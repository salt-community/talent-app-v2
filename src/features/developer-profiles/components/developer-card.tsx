import { Card, CardContent } from "@/components";
import { DeveloperProfileLink } from "./developer-profile-link";
import { Background } from "./backgrounds";

type Props = {
  developerProfileId: string;
};

export async function DeveloperCard({ developerProfileId }: Props) {
  return (
    <Card className="p-2 h-full justify-center min-w-[20rem] cursor-pointer hover:shadow-lg transition-shadow">
      <CardContent>
        <DeveloperProfileLink developerProfileId={developerProfileId}>
          <Background developerProfileId={developerProfileId} />
        </DeveloperProfileLink>
      </CardContent>
    </Card>
  );
}
