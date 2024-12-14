import { Card, CardContent } from "@/components";
import { Background } from "@/features/backgrounds/components";
import { MeiliSearch } from "meilisearch";
import { Search } from "./search";
import Link from "next/link";

type Props = { searchParams: Promise<{ search: string | undefined }> };
export default async function Page({ searchParams }: Props) {
  const search = (await searchParams).search;
  const client = new MeiliSearch({
    host: "http://localhost:7700",
    apiKey: process.env.MEILI_MASTER_KEY,
  });

  const index = client.index("backgrounds");

  const devIds = (await index.search(search)).hits.map((hit) => hit.devId);

  return (
    <div className="p-4 sm:p-8 space-y-4">
      <Search />
      <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {devIds.map((devId) => (
          <li key={devId} className="w-fit">
            <Link href={`/developers/${devId}`}>
              <Card className="p-2 h-full mx-auto flex items-center justify-center">
                <CardContent>
                  <Background devId={devId} />
                </CardContent>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
