import { Card, CardContent } from "@/components";
import { Background } from "./background";

type Props = {
  developerProfileId: string;
};

export function DeveloperCard({ developerProfileId }: Props) {
  return (
    <li>
      <Card className="p-2 h-full justify-center min-w-[20rem] cursor-pointer hover:shadow-lg transition-shadow">
        <CardContent>
          <Background developerProfileId={developerProfileId} page="search" />
        </CardContent>
      </Card>
    </li>
  );
}
