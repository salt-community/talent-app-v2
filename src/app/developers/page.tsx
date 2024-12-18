;import { Search } from "./search";
import { meiliSearch } from "../../../meili-search";
import { Developers } from "@/features";

type Props = { searchParams: Promise<{ search: string | undefined }> };
export default async function Page({ searchParams }: Props) {
  const search = (await searchParams).search;
  const index = meiliSearch.index("backgrounds");
  const devIds = (await index.search(search)).hits.map((hit) => hit.devId);

  return (
    <main className="px-4">
      <Search />
      <Developers devIds={devIds}/>
    </main>
  );
}
