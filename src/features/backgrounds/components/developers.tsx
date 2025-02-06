import { Card, CardContent } from "@/components";
import { Background } from "./background";

type Props = {
  developerProfileIds: string[];
};

export function Developers({ developerProfileIds }: Props) {
  return (
    <>
      <ul className="pt-20 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {developerProfileIds.map((developerProfileId, index) => (
          <li key={index} className="">
            <Card className="p-2 h-full justify-center min-w-[20rem]">
              <CardContent>
                <Background developerProfileId={developerProfileId} />
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
}
