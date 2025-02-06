import { Card, CardContent } from "@/components";
import { Background } from "./background";

type Props = {
  devIds: string[];
};

export function Developers({ devIds }: Props) {
  return (
    <>
      <ul className="pt-20 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {devIds.map((devId, index) => (
          <li key={index} className="">
            <Card className="p-2 h-full justify-center min-w-[20rem]">
              <CardContent>
                <Background developerProfileId={devId} />
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
}
