import { Search } from "./search";
import { backgroundsService } from "@/features";
import { Developers } from "@/features";
import { errorHandler } from "@/lib";

type Props = { searchParams: Promise<{ search: string | undefined }> };

export default async function Page({ searchParams }: Props) {
  const search = (await searchParams).search;
  let developerProfileIds: string[] = [];

  try {
    developerProfileIds =
      await backgroundsService.searchDeveloperProfileIds(search);
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
