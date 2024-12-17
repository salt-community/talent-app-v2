import { Card, CardContent } from "@/components";
import { Background } from "@/features/backgrounds/components";
import { Search } from "./search";
import { meiliSearch } from "../../../meili-search";

type Props = { searchParams: Promise<{ search: string | undefined }> };
export default async function Page({ searchParams }: Props) {
  const search = (await searchParams).search;
  const index = meiliSearch.index("backgrounds");
  const devIds = (await index.search(search)).hits.map((hit) => hit.devId);

  return (
    <main className="px-4">
      <Search />
      <ul className="pt-14 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {devIds.map((devId) => (
          <li key={devId} className="">
            <Card className="p-2 h-full flex justify-center min-w-[20rem]">
              <CardContent >
                <Background devid={devId} />
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </main>
  );
}
