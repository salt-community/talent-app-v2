import { Card, CardContent } from "@/components";
import { Background } from "@/features";
import { DeveloperProfileLink } from "./developer-profile-link";

type Props = {
  developerProfileId: string;
};

export async function DeveloperCard({ developerProfileId }: Props) {
  return (
    <li>
      <Card className="p-2 h-full justify-center min-w-[20rem] cursor-pointer hover:shadow-lg transition-shadow">
        <CardContent>
          <DeveloperProfileLink developerProfileId={developerProfileId}>
            <Background developerProfileId={developerProfileId} page="search" />
          </DeveloperProfileLink>
        </CardContent>
      </Card>
    </li>
  );
}
