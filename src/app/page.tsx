import { Card, CardContent } from "@/components";
import {
  Background,
  HighlightPage,
} from "@/features";
import { meiliSearch } from "../../meili-search";
import { Search } from "./developers/search";
import "dotenv/config"

type Props = { searchParams: Promise<{ search: string | undefined }> };
export default async function Home({ searchParams }: Props) {
  const search = (await searchParams).search;
  const index = meiliSearch.index("backgrounds");
  const devIds = (await index.search(search)).hits.map((hit) => hit.devId);

  if (process.env.NEXT_PUBLIC_FF_HIGHLIGHTS === "ON") {
    console.log("HI")
    return <HighlightPage />;
  }

  return (
    <main className="px-4">
      <Search />
      <ul className="pt-14 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {devIds.map((devId) => (
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
