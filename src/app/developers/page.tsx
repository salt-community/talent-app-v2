import { Card, CardContent } from "@/components";
import { Background } from "@/features/backgrounds/components";
import { backgroundsService } from "@/features/backgrounds/instance";
import { BackgroundSelect } from "@/features/backgrounds/schema";
import { MeiliSearch } from "meilisearch";
import { Search } from "./search";

export default async function Page() {
  const client = new MeiliSearch({
    host: "http://localhost:7700",
    apiKey: process.env.MEILI_MASTER_KEY,
  });

  const index = client.index("backgrounds");

  const ids = (await index.search("javascript")).hits.map((hit) => hit.id);

  return (
    <div className="p-4 sm:p-8 space-y-4">
      <Search />
      <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {ids.map((id) => (
          <li key={id}>
            <Card className="h-full mx-auto flex items-center justify-center">
              <CardContent>
                <Background id={id} />
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
