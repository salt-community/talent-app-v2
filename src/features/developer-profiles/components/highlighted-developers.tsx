import { Card, CardContent } from "@/components";
// import { DeveloperProfileLink } from "./developer-profile-link";
import { Background } from "../backgrounds";

type Props = {
  developerProfileIds: string[];
};

//commented out clickability

export async function HighlightedDevelopers({ developerProfileIds }: Props) {
  return (
    <>
      <ul className="px-4 pt-10 grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {developerProfileIds.map((developerProfileId, index) => (
            <Card key={index} className="p-2 h-full flex justify-center min-w-[20rem]">
              <CardContent>
                {/* <DeveloperProfileLink developerProfileId={developerProfileId}> */}
                  <Background
                    developerProfileId={developerProfileId}
                  />
                {/* </DeveloperProfileLink> */}
              </CardContent>
            </Card>
        ))}
      </ul>
    </>
  );
}
