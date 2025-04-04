import { developerProfilesService } from "@/features/developer-profiles";
import { Search } from "../developers/search";
import { DeveloperCard } from "@/features/developer-profiles/components/developer-card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import CircularRank from "./circular-rank";

type Props = { searchParams: Promise<{ search: string | undefined }> };

export default async function Page({ searchParams }: Props) {
  const search = (await searchParams).search;
  const developerProfilesWithRanking =
    await developerProfilesService.searchDeveloperProfilesWithLLM(search);

  return (
    <main className="px-4 pb-6">
      <Search />
      <ul className="pt-20 grid gap-x-4 gap-y-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {developerProfilesWithRanking.map((developerProfile, index) => (
          <li key={index} className="relative">
            <DeveloperCard developerProfile={developerProfile} />
            {developerProfile.ranking && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="absolute top-3 right-3">
                    <CircularRank percentage={developerProfile.ranking} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm text-center">
                      This developer profile matches your search by{" "}
                      {developerProfile.ranking}%.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
