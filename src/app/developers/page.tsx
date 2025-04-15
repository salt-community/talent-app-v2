import { Search } from "./search";
import { errorHandler } from "@/lib";
import {
  developerProfilesService,
  Developers,
} from "@/features/developer-profiles";
import { Suspense } from "react";
import Loading from "./loading";

type Props = { searchParams: Promise<{ search: string | undefined }> };

export default async function Page({ searchParams }: Props) {
  const search = (await searchParams).search;
  let developerProfileIds: string[] = [];
  try {
    developerProfileIds =
      await developerProfilesService.searchDeveloperProfileIds(search);
  } catch (error) {
    errorHandler(error);
  }

  return (
    <main className="px-4 pb-6">
      <Search />
      <Suspense fallback={<Loading />}>
        <Developers developerProfileIds={developerProfileIds} />
      </Suspense>
    </main>
  );
}
