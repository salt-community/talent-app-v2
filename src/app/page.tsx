import {
  HighlightPage,
} from "@/features";
import { meiliSearch } from "../../meili-search";
import { Search } from "./developers/search";
import "dotenv/config"
import { Developers } from "@/features";

type Props = { searchParams: Promise<{ search: string | undefined }> };
export default async function Home({ searchParams }: Props) {
  const search = (await searchParams).search;
  const index = meiliSearch.index("backgrounds");
  const devIds = (await index.search(search)).hits.map((hit) => hit.devId);

  if (process.env.NEXT_PUBLIC_FF_HIGHLIGHTS === "ON") {
    return <HighlightPage />;
  }

  return (
    <main className="px-4">
      <Search />
      <Developers devIds={devIds}/>
    </main>
  );
}
