import { Search } from "./search";
import { errorHandler } from "@/lib";
import {
  CvInfo,
  developerProfilesService,
  Developers,
} from "@/features/developer-profiles";
import { Suspense } from "react";
import Loading from "./loading";

type Props = { searchParams: Promise<{ search: string | undefined }> };

export default async function Page({ searchParams }: Props) {
  const search = (await searchParams).search;
  let developerProfiles: CvInfo[] = [];
  try {
    developerProfiles =
      await developerProfilesService.searchDeveloperProfiles(search);
  } catch (error) {
    errorHandler(error);
  }

  return (
    <main className="px-4 pb-6">
      <Search />
      <Suspense fallback={<Loading />}>
        <Developers developerProfiles={developerProfiles} />
      </Suspense>
    </main>
  );
}
