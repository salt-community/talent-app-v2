import { errorHandler } from "@/lib";
import { backgroundsService, Developers } from "@/features/developer-profiles";
import { Search } from "../developers/search";

type Props = { searchParams: Promise<{ search: string | undefined }> };

export default async function Page({ searchParams }: Props) {
  const search = (await searchParams).search;
  let developerProfileIds: string[] = [];
  try {
    developerProfileIds =
      await backgroundsService.searchDeveloperProfileIdsWithLLM(search);
  } catch (error) {
    errorHandler(error);
  }

  return (
    <main className="px-4 pb-6">
      <Search />
      <Developers developerProfileIds={developerProfileIds} />
    </main>
  );
}
