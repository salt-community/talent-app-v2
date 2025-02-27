import { errorHandler } from "@/lib";
import { developerProfilesService } from "@/features/developer-profiles";
import { Search } from "../developers/search";
import { DeveloperCard } from "@/features/developer-profiles/components/developer-card";

type Props = { searchParams: Promise<{ search: string | undefined }> };

export default async function Page({ searchParams }: Props) {
  const search = (await searchParams).search;
  let developerProfiles: { id: string; ranking?: number }[] = [];
  try {
    developerProfiles =
      await developerProfilesService.searchDeveloperProfileIdsWithLLM(search);
  } catch (error) {
    errorHandler(error);
  }

  return (
    <main className="px-4 pb-6">
      <Search />
      <ul className="pt-20 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {developerProfiles.map((developerProfile, index) => (
          <li key={index} className="">
            <div className="place-self-end">
              Ranking: {developerProfile.ranking}%
            </div>
            <DeveloperCard
              key={index}
              developerProfileId={developerProfile.id}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
