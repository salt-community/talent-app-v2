import { Card, CardContent } from "@/components";
import { backgroundsService } from "@/features";
import { Background } from "./background";

export async function HighlightedDevelopers() {
  const highlightedDevIds = await backgroundsService.getHighlightedDevIds();

  return (
    <main className="px-4">
      <ul className="pt-14 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {highlightedDevIds.map((devId) => (
          <li key={devId} className="">
            <Card className="p-2 h-full flex justify-center min-w-[20rem]">
              <CardContent>
                <Background devid={devId} />
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </main>
  );
}
