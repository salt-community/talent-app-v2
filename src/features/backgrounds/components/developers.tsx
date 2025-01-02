import { Card, CardContent } from "@/components";
import { Background } from "./background";

type Props = {
  devIds: string[];
};

export function Developers({ devIds }: Props) {
  return (
    <>
      <ul className="pt-200 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {devIds.map((devId) => (
          <li key={devId} className="">
            <Card className="p-2 h-full justify-center min-w-[20rem]">
              <CardContent>
                <Background devId={devId} />
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
}
