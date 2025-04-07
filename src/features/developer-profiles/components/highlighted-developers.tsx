import { Card, CardContent } from "@/components";
import { Background } from "./backgrounds";
import { developerProfilesService } from "../instance";

export async function HighlightedDevelopers() {

  const developerProfiles = await developerProfilesService.getHighlightedDevelopersProfiles();
  return (
    <>
      <ul className="px-4 pt-10 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:px-8" >
        {developerProfiles.map((developerProfile, index) => (
          <Card key={index} className="p-2 h-full flex justify-center min-w-[20rem]">
            <CardContent>
              <Background developerProfile={developerProfile} />
            </CardContent>
          </Card>
        ))}
      </ul>
    </>
  );
}
