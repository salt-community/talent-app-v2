;import { Search } from "./search";
import { backgroundsService } from "@/features";
import { Developers } from "@/features";

type Props = { searchParams: Promise<{ search: string | undefined }> };
export default async function Page({ searchParams }: Props) {
  const search = (await searchParams).search;
  const devIds = await backgroundsService.searchDevIds(search);

  return (
    <main className="px-4">
      <Search />
      <Developers devIds={devIds}/>
    </main>
  );
}
