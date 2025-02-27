import { errorHandler } from "@/lib";
import { developerProfilesService } from "@/features/developer-profiles";
import { Search } from "../developers/search";
import { DeveloperCard } from "@/features/developer-profiles/components/developer-card";
import { Card } from "@/components";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
      <ul className="pt-20 grid gap-x-4 gap-y-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {developerProfiles.map((developerProfile, index) => (
          <li key={index} className="relative">
            <DeveloperCard developerProfileId={developerProfile.id} />
            {developerProfile.ranking && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    className="absolute top-[-5] right-[-5]
                  bg-lightGray text-xs text-white rounded-full p-2"
                  >
                    {developerProfile.ranking}%
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
